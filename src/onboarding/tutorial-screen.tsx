import React, { FunctionComponent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TouchableOpacityRef, useAccessibilityFocus } from '../accessibility';
import { BackButton, Button, ButtonProps } from '../buttons';
import { ImageOrComponent, ImageOrComponentSource } from '../image';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';
import ContrastingStatusBar from '../utils/contrasting-status-bar';
import Pagination from './pagination';

export interface TutorialScreenButton {
  label: string;
  type?: ButtonProps['type'];
  onPress?: () => void;
  style?: ViewStyle;
}

export interface TutorialScreenAdditionalButton extends Omit<TutorialScreenButton, 'onPress'> {
  onPress?: (() => void) | 'skip';
}

export enum TutorialIllustrationPosition {
  top,
  middle,
  bottom,
}

export interface TutorialScreenPage {
  title: string | ReactNode;
  titleSpacer?: boolean;
  illustration: ImageOrComponentSource;
  description: string;
  illustrationPosition?: TutorialIllustrationPosition;
  nextButton: TutorialScreenButton;
  prevButton?: TutorialScreenAdditionalButton;
}

export interface TutorialScreenProps {
  backAction?: () => void;
  pages: Array<TutorialScreenPage>;
}

interface PageMeasurements {
  // currently visible page
  selected: boolean;
  // accessibility announcement
  onAnnouncementFinished: (finished: boolean) => void;
  // height measurement
  onTitleHeight: (titleHeight: number) => void;
  onDescriptionHeight: (descriptionHeight: number) => void;
  maxTitleHeight?: number;
  maxDescriptionHeight?: number;
  leftOverHeightForIllustration?: number;
}

// boundaries for illustration shrinking
const MIN_ILLUSTRATION_HEIGHT = 120;
const MAX_ILLUSTRATION_HEIGHT = 288;

// extract height from the onLayout event
const heightMeasurement = (callback: (height: number) => void) => (event: LayoutChangeEvent) =>
  callback(event.nativeEvent.layout.height);

const Page: FunctionComponent<TutorialScreenPage & PageMeasurements> = ({
  title,
  titleSpacer = true,
  description,
  illustration,
  illustrationPosition = TutorialIllustrationPosition.middle,
  selected,
  onAnnouncementFinished,
  onTitleHeight,
  onDescriptionHeight,
  maxTitleHeight,
  maxDescriptionHeight,
  leftOverHeightForIllustration,
}) => {
  const colorScheme = useAppColorScheme();

  const [titleAnnouncementFinished, setTitleAnnouncementFinished] = useState(false);

  // reset announcement state when page hidden
  const accessibilityAnnouncementResetKey = selected ? 1 : 0;
  useEffect(() => {
    if (!selected) {
      setTitleAnnouncementFinished(false);
    }
  }, [onAnnouncementFinished, selected]);

  // layout measurements
  const { width: screenWidth } = useWindowDimensions();
  const illustrationHeight = leftOverHeightForIllustration
    ? Math.min(MAX_ILLUSTRATION_HEIGHT, leftOverHeightForIllustration)
    : undefined;

  const imageComponent =
    illustrationHeight && illustrationHeight > MIN_ILLUSTRATION_HEIGHT ? (
      <ImageOrComponent
        source={illustration}
        style={[
          styles.image,
          {
            width: screenWidth,
            height: illustrationHeight,
          },
        ]}
      />
    ) : null;

  return (
    <View accessibilityElementsHidden={!selected} style={[styles.page, { width: screenWidth }]}>
      {illustrationPosition === TutorialIllustrationPosition.top && titleSpacer && <View style={styles.pageSpacer} />}
      {illustrationPosition === TutorialIllustrationPosition.top && imageComponent}
      <Typography
        key={`title_${accessibilityAnnouncementResetKey}`}
        accessibilityRole="header"
        announcementActive={selected}
        onAnnouncementFinished={setTitleAnnouncementFinished}
        onLayout={heightMeasurement(onTitleHeight)}
        style={[styles.title, { minHeight: maxTitleHeight }]}
        color={colorScheme.text}
        size="h1"
        bold={true}
        align="center">
        {title}
      </Typography>
      {illustrationPosition === TutorialIllustrationPosition.middle && titleSpacer && (
        <View style={styles.pageSpacer} />
      )}
      {illustrationPosition === TutorialIllustrationPosition.middle && imageComponent}
      <Typography
        key={`description_${accessibilityAnnouncementResetKey}`}
        announcementActive={selected && titleAnnouncementFinished}
        onAnnouncementFinished={onAnnouncementFinished}
        onLayout={heightMeasurement(onDescriptionHeight)}
        style={[styles.description, { minHeight: maxDescriptionHeight }]}
        color={colorScheme.text}
        align="center">
        {description}
      </Typography>
      {illustrationPosition === TutorialIllustrationPosition.bottom && titleSpacer && (
        <View style={styles.pageSpacer} />
      )}
      {illustrationPosition === TutorialIllustrationPosition.bottom && imageComponent}
      <View style={styles.pageSpacer} />
    </View>
  );
};

const TutorialScreen: FunctionComponent<TutorialScreenProps> = ({ backAction, pages }) => {
  const colorScheme = useAppColorScheme();

  const { width: screenWidth } = useWindowDimensions();

  const pagesView = useRef<FlatList<TutorialScreenPage>>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = pages.length;

  const goToNextPage = useCallback(() => {
    if (currentPage < pageCount - 1) {
      pagesView.current?.scrollToIndex({ index: currentPage + 1, animated: true });
    }
  }, [currentPage, pageCount]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 0) {
      pagesView.current?.scrollToIndex({ index: currentPage - 1, animated: true });
    }
  }, [currentPage]);

  const goToLastPage = useCallback(() => {
    if (currentPage < pageCount - 1) {
      pagesView.current?.scrollToIndex({ index: pageCount - 1, animated: true });
    }
  }, [currentPage, pageCount]);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const position = Math.floor(0.5 + event.nativeEvent.contentOffset.x / screenWidth);
      setCurrentPage(Math.min(Math.max(0, position), pageCount - 1));
    },
    [pageCount, screenWidth],
  );

  const { nextButton, prevButton } = pages[currentPage];

  // calculations of illustrations height - based on the left-over space after title/description render
  const [maxTitleHeight, setMaxTitleHeight] = useState<number>();
  const onTitleHeight = useCallback((titleHeight: number) => {
    setMaxTitleHeight((prev) => (prev ? Math.max(titleHeight, prev) : titleHeight));
  }, []);
  const [maxDescriptionHeight, setMaxDescriptionHeight] = useState<number>();
  const onDescriptionHeight = useCallback((descriptionHeight: number) => {
    setMaxDescriptionHeight((prev) => (prev ? Math.max(descriptionHeight, prev) : descriptionHeight));
  }, []);

  const [pagerHeight, setPagerHeight] = useState<number>();

  const leftOverHeightForIllustration =
    pagerHeight && maxTitleHeight && maxDescriptionHeight
      ? pagerHeight - maxTitleHeight - maxDescriptionHeight
      : undefined;

  // accessibility announcements/focus
  const [pageAnnouncementFinished, setPageAnnouncementFinished] = useState(false);
  const continueButton = useAccessibilityFocus<TouchableOpacityRef>(pageAnnouncementFinished);

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colorScheme.white }]}>
      <ContrastingStatusBar backgroundColor={colorScheme.white} />
      <View style={styles.backButtonWrapper}>{backAction && <BackButton onPress={backAction} />}</View>
      <FlatList<TutorialScreenPage>
        ref={pagesView}
        horizontal={true}
        style={styles.container}
        onScroll={onScroll}
        data={pages}
        renderItem={({ item, index }) => (
          <Page
            {...item}
            selected={currentPage === index}
            onAnnouncementFinished={setPageAnnouncementFinished}
            onTitleHeight={onTitleHeight}
            onDescriptionHeight={onDescriptionHeight}
            maxTitleHeight={maxTitleHeight}
            maxDescriptionHeight={maxDescriptionHeight}
            leftOverHeightForIllustration={leftOverHeightForIllustration}
          />
        )}
        getItemLayout={(_, index) => ({ length: screenWidth, offset: screenWidth * index, index })}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onLayout={heightMeasurement(setPagerHeight)}
      />

      <View style={styles.buttons}>
        {pageCount > 1 ? (
          <Pagination style={styles.pageControl} currentPage={currentPage} totalPages={pageCount} />
        ) : undefined}
        <Button
          ref={continueButton}
          style={[styles.nextButton, nextButton.style]}
          type={nextButton.type ?? (currentPage === pageCount - 1 ? 'default' : 'light')}
          onPress={nextButton.onPress ?? goToNextPage}>
          {nextButton.label}
        </Button>
        {prevButton ? (
          <Button
            style={[styles.previousButton, prevButton.style]}
            type={prevButton.type ?? (currentPage === 0 ? 'lightBorderless' : 'light')}
            onPress={
              prevButton.onPress
                ? prevButton.onPress === 'skip'
                  ? goToLastPage
                  : prevButton.onPress
                : goToPreviousPage
            }>
            {prevButton.label}
          </Button>
        ) : undefined}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backButtonWrapper: {
    height: 24,
    marginLeft: 24,
    width: 24,
  },
  buttons: {
    alignItems: 'center',
    marginHorizontal: 24,
  },
  container: {
    flex: 0.5,
    marginTop: 12,
  },
  description: {
    paddingBottom: 24,
    paddingHorizontal: 12,
  },
  image: {
    marginBottom: 24,
    overflow: 'hidden',
  },
  nextButton: {
    marginTop: 27,
  },
  page: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pageControl: {
    marginVertical: 12,
  },
  pageSpacer: {
    flex: 1,
  },
  previousButton: {
    marginTop: 16,
  },
  root: {
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
});

export default TutorialScreen;
