import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, LayoutChangeEvent, Linking, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  clamp,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import { reportException } from '../../utils';
import { concatTestID } from '../../utils/testID';
import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import { Button, ButtonType } from '../buttons/button';
import { CopyContentIcon, OpenLinkIcon } from '../icons/nerd-view';
import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';

const VALUE_PREVIEW_LENGTH = 80;
const ICON_HEIGHT = 48;
const CONTAINER_PADDING = 8;

// The onExpand and expandedAttributes props are used to notify other expanded fields
// that the layout (and thus the scrollOffset / icon position) has changed. This
// will trigger a view measurement and repositioning of the icon on all expanded fields.

export type NerdModeItemProps = {
  attributeKey: string;
  attributeText?: string;
  canBeCopied?: boolean;
  element?: React.ReactElement;
  expandedAttributes?: number;
  highlightedText?: string;
  labels: {
    expand: string;
    collapse: string;
  };
  last?: boolean;
  link?: string;
  onCopyToClipboard: (value: string) => void;
  onExpand?: (expanded: boolean) => void;
  scrollOffset?: SharedValue<number>;
  testID?: string;
};

const styles = StyleSheet.create({
  actionIcon: {
    alignItems: 'center',
    flex: 0.15,
    height: ICON_HEIGHT,
    justifyContent: 'center',
  },
  actionIconSingleLine: {
    height: 24,
  },
  attributeLabel: {
    marginBottom: 4,
    paddingHorizontal: 6,
  },
  attributeValue: {
    flex: 0.85,
    flexGrow: 1,
  },
  attributeValueContainer: {
    borderRadius: 2,
    borderWidth: 0.2,
    flexDirection: 'row',
    padding: CONTAINER_PADDING,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  expandValueButton: {
    borderRadius: 4,
    borderWidth: 0,
    marginTop: 4,
  },
  lastAttribute: {
    paddingBottom: 30,
  },
});

export const ActionIcon: FunctionComponent<{
  copy?: boolean;
  link?: string;
  onCopyToClipboard: (value: string) => void;
  style?: ViewStyle;
  testID?: string;
  value: string;
}> = ({ value, link, onCopyToClipboard, testID, copy }) => {
  const handleCopy = useCallback(() => {
    onCopyToClipboard(value);
  }, [onCopyToClipboard, value]);

  const openLink = useCallback(() => {
    if (link) {
      Linking.openURL(link).catch((e) => {
        reportException(e, 'Error opening nerd link');
      });
    }
  }, [link]);

  if (copy) {
    return (
      <TouchableOpacity onPress={handleCopy} testID={testID}>
        <CopyContentIcon />
      </TouchableOpacity>
    );
  }

  if (link) {
    return (
      <TouchableOpacity onPress={openLink} testID={testID}>
        <OpenLinkIcon />
      </TouchableOpacity>
    );
  }

  return null;
};

const TextWithHighlight: FunctionComponent<{
  highlightedText: string;
  onLayout?: (event: LayoutChangeEvent) => void;
  testID: string;
  text: string;
}> = ({ highlightedText, onLayout, testID, text }) => {
  const colorScheme = useAppColorScheme();
  return (
    <Typography
      color={colorScheme.white}
      onLayout={onLayout}
      preset="s/code"
      style={styles.attributeValue}
      testID={testID}>
      <Typography color={colorScheme.nerdView.codeHighlightText} preset="s/code">
        {highlightedText}
      </Typography>
      {text}
    </Typography>
  );
};

const NerdModeItem: FunctionComponent<NerdModeItemProps> = ({
  highlightedText = '',
  attributeText = '',
  attributeKey,
  labels,
  link,
  canBeCopied,
  onCopyToClipboard,
  onExpand,
  expandedAttributes,
  last = false,
  scrollOffset,
  element,
  testID,
}) => {
  const colorScheme = useAppColorScheme();
  const valueViewRef = React.useRef<View>(null);
  const [isSingleLine, setIsSingleLine] = useState<boolean>();

  const expandedView = useSharedValue({
    expandedAtOffset: 0,
    viewHeight: 0,
    viewStart: 0,
  });

  const expandable = attributeText.length > VALUE_PREVIEW_LENGTH;
  const [expanded, setExpanded] = useState(!expandable);

  const screenMiddle = useMemo(() => Dimensions.get('screen').height / 2, []);

  const iconTopPosition = useDerivedValue(() => {
    if (isSingleLine === undefined) {
      return 0;
    }
    if (!expanded || !expandable || !scrollOffset || isSingleLine) {
      const iconHeight = isSingleLine ? 0 : ICON_HEIGHT;
      return expandedView.value.viewHeight / 2 - iconHeight / 2;
    }

    const viewEnd = expandedView.value.viewStart + expandedView.value.viewHeight;
    let zeroedOffset = scrollOffset.value - expandedView.value.expandedAtOffset;

    if (expandedView.value.viewStart > screenMiddle) {
      zeroedOffset = zeroedOffset - (expandedView.value.viewStart - screenMiddle + ICON_HEIGHT / 2);
    } else {
      if (viewEnd < screenMiddle + ICON_HEIGHT) {
        zeroedOffset = zeroedOffset + (screenMiddle - expandedView.value.viewStart - ICON_HEIGHT / 2);
      } else if (expandedView.value.viewStart < screenMiddle && viewEnd > screenMiddle) {
        zeroedOffset = zeroedOffset + (screenMiddle - expandedView.value.viewStart - ICON_HEIGHT / 2);
      }
    }

    return clamp(zeroedOffset, 0, expandedView.value.viewHeight - ICON_HEIGHT - 8);
  });

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: iconTopPosition.value,
        },
      ],
    };
  });

  const previewText = expanded ? attributeText : attributeText.slice(0, VALUE_PREVIEW_LENGTH) + '...';

  useEffect(() => {
    if (!scrollOffset || isSingleLine === undefined) {
      return;
    }

    setTimeout(() => {
      valueViewRef.current?.measure((x, y, w, h, px, py) => {
        expandedView.value = {
          expandedAtOffset: isSingleLine ? 0 : scrollOffset.value,
          viewHeight: isSingleLine ? 0 : h - 2 * CONTAINER_PADDING,
          viewStart: py,
        };
      });
    }, 0);
    // We only recompute when any attribute is expanded
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedAttributes, isSingleLine]);

  const onTextLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setIsSingleLine(height <= 24);
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme.nerdView.attributeSectionBackground },
        last ? styles.lastAttribute : {},
      ]}
      testID={testID}>
      <Typography
        color={colorScheme.nerdView.attributeLabel}
        preset="s/code"
        style={styles.attributeLabel}
        testID={concatTestID(testID, 'attributeLabel')}>
        {attributeKey}
      </Typography>
      <View
        ref={valueViewRef}
        style={[
          styles.attributeValueContainer,
          {
            backgroundColor: colorScheme.nerdView.attributeValueBackground,
            borderColor: colorScheme.nerdView.attributeValueBorder,
          },
        ]}>
        {element ? (
          element
        ) : (
          <TextWithHighlight
            highlightedText={highlightedText}
            onLayout={onTextLayout}
            testID={concatTestID(testID, 'attributeValue')!}
            text={previewText}
          />
        )}
        {(canBeCopied || link) && isSingleLine !== undefined ? (
          <Animated.View style={[styles.actionIcon, isSingleLine ? styles.actionIconSingleLine : undefined, iconStyle]}>
            {
              <ActionIcon
                copy={canBeCopied}
                link={link}
                onCopyToClipboard={onCopyToClipboard}
                testID={concatTestID(testID, 'actionIcon')}
                value={`${highlightedText}${attributeText}`}
              />
            }
          </Animated.View>
        ) : null}
      </View>
      {expandable ? (
        <Button
          onPress={() => {
            onExpand && onExpand(!expanded);
            setExpanded(!expanded);
          }}
          style={styles.expandValueButton}
          testID={concatTestID(testID, 'expandValueButton')}
          title={expanded ? labels.collapse : labels.expand}
          type={ButtonType.SmallTech}
        />
      ) : null}
    </View>
  );
};

export default NerdModeItem;
