import React, { FunctionComponent, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAccessibilityFocus } from '../accessibility/accessibility';
import type { TouchableHighlightRef } from '../accessibility/accessibilityHistoryWrappers';
import { Button } from '../buttons';
import { GradientBackground } from '../gradient';
import { Typography } from '../text';
import { theme, useAppColorScheme } from '../theme';
import ContrastingStatusBar from '../utils/contrasting-status-bar';
import { concatTestID } from '../utils/testID';
import LoadingAnimation from './loading-animation';
import Animations from './loading-animations';

export enum LoadingResultVariation {
  Neutral = 'neutral',
  Accent = 'accent',
}

export enum LoadingResultState {
  InProgress = 'inProgress',
  Success = 'success',
  Failure = 'failure',
  Error = 'error',
}

export interface LoadingResultProps {
  testID?: string;
  variation: LoadingResultVariation;
  title: string;
  subtitle: string;
  state: LoadingResultState;
  /** if `undefined`, the button will not be displayed */
  onClose?: () => void;
  onRetry?: () => void;
  onCTA?: () => void;
  inProgressCloseButtonLabel: string;
  successCloseButtonLabel: string;
  failureCloseButtonLabel: string;
  retryButtonLabel?: string;
  ctaButtonLabel?: string;
  bottomView?: ReactNode;
}

const LoadingResult: FunctionComponent<LoadingResultProps> = ({
  testID,
  variation,
  title,
  subtitle,
  state,
  onClose,
  onRetry,
  onCTA,
  inProgressCloseButtonLabel,
  successCloseButtonLabel,
  failureCloseButtonLabel,
  retryButtonLabel,
  ctaButtonLabel,
  bottomView,
}) => {
  const colorScheme = useAppColorScheme();

  const [loadingAnimationDone, setLoadingAnimationDone] = useState(state !== LoadingResultState.InProgress);
  const onAnimationDone = useCallback(() => {
    setLoadingAnimationDone(true);
  }, []);
  useEffect(() => {
    if (state === LoadingResultState.InProgress) {
      setLoadingAnimationDone(false);
    }
  }, [state]);

  const visibleState = loadingAnimationDone ? state : LoadingResultState.InProgress;
  const accentVariation = variation === LoadingResultVariation.Accent;

  const animation = useMemo(() => {
    switch (visibleState) {
      case LoadingResultState.Success:
        return accentVariation
          ? Animations.success(colorScheme.accentSecondary, colorScheme.accentText)
          : Animations.success(colorScheme.accent, colorScheme.text);
      case LoadingResultState.Failure:
        return accentVariation
          ? Animations.failure(colorScheme.accentSecondary, colorScheme.accentText)
          : Animations.failure(colorScheme.accent, colorScheme.text);
      case LoadingResultState.Error:
        return accentVariation
          ? Animations.error(colorScheme.accentSecondary, colorScheme.accentText)
          : Animations.error(colorScheme.accent, colorScheme.text);
      case LoadingResultState.InProgress:
        return accentVariation
          ? Animations.loading(colorScheme.accentSecondary, colorScheme.accentText)
          : Animations.loading(colorScheme.accent, colorScheme.accentSecondary);
    }
  }, [visibleState, accentVariation, colorScheme]);

  const closeButtonLabel = useMemo(() => {
    switch (visibleState) {
      case LoadingResultState.Success:
        return successCloseButtonLabel;
      case LoadingResultState.Failure:
      case LoadingResultState.Error:
        return failureCloseButtonLabel;
      case LoadingResultState.InProgress:
        return inProgressCloseButtonLabel;
    }
  }, [failureCloseButtonLabel, inProgressCloseButtonLabel, successCloseButtonLabel, visibleState]);

  const [announcementFinished, setAnnouncementFinished] = useState(false);
  const accessibilityFocus = useAccessibilityFocus<TouchableHighlightRef>(loadingAnimationDone && announcementFinished);

  const backgroundColor = accentVariation ? colorScheme.accent : colorScheme.background;
  return (
    <>
      {!accentVariation && <GradientBackground />}
      <SafeAreaView testID={testID} style={[styles.content, { backgroundColor }]}>
        <ContrastingStatusBar backgroundColor={backgroundColor} />
        <View style={styles.top}>
          <Typography
            accessibilityRole="header"
            align="center"
            size="h1"
            allowFontScaling={false}
            bold={true}
            color={accentVariation ? colorScheme.accentText : colorScheme.text}>
            {title}
          </Typography>
          <Typography
            announcementActive={true}
            announcementCumulative={true}
            onAnnouncementFinished={setAnnouncementFinished}
            style={styles.subtitle}
            align="center"
            color={accentVariation ? colorScheme.accentText : colorScheme.text}>
            {subtitle}
          </Typography>
        </View>
        <View testID={concatTestID(testID, 'animation')} style={styles.statusWrapper}>
          {!accentVariation && <View style={[styles.loaderBackground, { backgroundColor: colorScheme.white }]} />}
          <LoadingAnimation
            testID={concatTestID(testID, 'animation', state)}
            animation={animation}
            finished={state !== LoadingResultState.InProgress}
            onDone={onAnimationDone}
          />
        </View>
        <View style={styles.bottom}>
          {bottomView ?? (
            <>
              {visibleState === LoadingResultState.Failure && onRetry && (
                <Button
                  testID={concatTestID(testID, 'retry')}
                  type={accentVariation ? 'light' : 'default'}
                  onPress={onRetry}
                  // eslint-disable-next-line react-native/no-inline-styles
                  textStyle={{ bold: true }}>
                  {retryButtonLabel}
                </Button>
              )}
              {visibleState === LoadingResultState.Success && onCTA && (
                <Button
                  testID={concatTestID(testID, 'cta')}
                  ref={accessibilityFocus}
                  type={accentVariation ? 'light' : 'default'}
                  onPress={onCTA}
                  // eslint-disable-next-line react-native/no-inline-styles
                  textStyle={{ bold: true }}>
                  {ctaButtonLabel}
                </Button>
              )}
              {onClose && (
                <Button
                  testID={concatTestID(testID, 'close')}
                  ref={!onCTA ? accessibilityFocus : undefined}
                  type={
                    (visibleState === LoadingResultState.Success && !onCTA) !== accentVariation ? 'default' : 'light'
                  }
                  textStyle={{ bold: visibleState === LoadingResultState.Success && !onCTA }}
                  onPress={onClose}>
                  {closeButtonLabel}
                </Button>
              )}
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  bottom: {
    alignItems: 'center',
    flex: 1,
    gap: 12,
    justifyContent: 'flex-end',
  },
  content: {
    flex: 1,
    paddingBottom: theme.paddingM,
    paddingHorizontal: theme.padding,
    paddingTop: theme.padding,
  },
  loaderBackground: {
    borderRadius: 75,
    height: 150,
    position: 'absolute',
    width: 150,
  },
  statusWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    paddingTop: theme.grid,
  },
  top: {
    alignItems: 'center',
    flex: 1,
  },
});

export default LoadingResult;
