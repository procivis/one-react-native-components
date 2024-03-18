import React, { FunctionComponent, PropsWithChildren, ReactNode, useCallback, useEffect, useState } from 'react';
import { Animated, Easing, LayoutChangeEvent, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Path, SvgProps } from 'react-native-svg';

import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import { ListItem, ListItemProps } from '../list';
import { useAppColorScheme } from '../theme';

export type AccordionProps = PropsWithChildren<Omit<ListItemProps, 'onPress' | 'style'>> & {
  /** style override for the expandable content */
  contentStyle?: StyleProp<ViewStyle>;

  /** additional content below the list-item content */
  headerNotice?: ReactNode;
} & (
    | {
        // expanded/collapsed state managed by the component
        /** optional, default: `true` */
        initiallyExpanded?: boolean;
      }
    | {
        // expanded/collapsed state managed externally
        expanded: boolean;
        /** optionally get notified about changed expanded state */
        onPress?: () => void;
      }
  );

// https://www.figma.com/file/S3WwgTMHuqxAsfu5zElCzq/App-Icon-Library-(Design)?type=design&node-id=41-478&t=yVRMjIPtDiBwq5Ax-4
const UpIcon: React.FunctionComponent<SvgProps> = ({ color, ...props }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M5.60988 14.8705C5.53977 14.805 5.5 14.7135 5.5 14.6177C5.5 14.522 5.53977 14.4305 5.60988 14.3649L11.4841 8.5L17.4018 14.3649C17.5327 14.5082 17.5327 14.7272 17.4018 14.8705L16.8796 15.3906C16.8138 15.4604 16.722 15.5 16.6258 15.5C16.5297 15.5 16.4378 15.4604 16.372 15.3906L11.5131 10.5513L6.62518 15.3906C6.55937 15.4604 6.46751 15.5 6.37135 15.5C6.2752 15.5 6.18333 15.4604 6.11753 15.3906L5.60988 14.8705Z"
        fill={color}
      />
    </Svg>
  );
};

// https://www.figma.com/file/S3WwgTMHuqxAsfu5zElCzq/App-Icon-Library-(Design)?type=design&node-id=41-477&t=yVRMjIPtDiBwq5Ax-4
const DownIcon: React.FunctionComponent<SvgProps> = ({ color, ...props }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M17.8901 9.12948C17.9602 9.19502 18 9.28652 18 9.38228C18 9.47804 17.9602 9.56954 17.8901 9.63508L12.0159 15.5L6.09821 9.63508C5.96726 9.49178 5.96726 9.27278 6.09821 9.12948L6.62036 8.60944C6.68616 8.53961 6.77803 8.5 6.87418 8.5C6.97034 8.5 7.06221 8.53961 7.12801 8.60944L11.9869 13.4487L16.8748 8.60944C16.9406 8.53961 17.0325 8.5 17.1286 8.5C17.2248 8.5 17.3167 8.53961 17.3825 8.60944L17.8901 9.12948Z"
        fill={color}
      />
    </Svg>
  );
};

/**
 * Expandable/collapsible accordion component
 * * The `children` are used for expandable content
 * * other props are used for the header ({@link ListItem})
 *
 * Following the design: https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?type=design&node-id=28-1129&t=eVhals9hIreZTaB1-4
 */
const Accordion: FunctionComponent<AccordionProps> = ({
  accessibilityLabel,
  accessibilityRole,
  accessibilityState,
  accessibilityValue,
  accessibilityHint,
  disabled,
  children,
  contentStyle,
  headerNotice,
  ...props
}) => {
  const t = useAccessibilityTranslation();
  const colorScheme = useAppColorScheme();

  const [internalExpanded, setExpanded] = useState<boolean>(
    'initiallyExpanded' in props ? props.initiallyExpanded ?? true : true,
  );
  const toggleExpanded = useCallback(() => setExpanded((prev) => !prev), []);

  const expanded = 'expanded' in props ? props.expanded : internalExpanded;
  const CaretIcon = expanded ? UpIcon : DownIcon;

  const [animation] = useState(() => new Animated.Value(expanded ? 1 : 0));
  const [contentSize, setContentSize] = useState<number>();
  const onContentLayout = useCallback((event: LayoutChangeEvent) => {
    setContentSize(event.nativeEvent.layout.height);
  }, []);
  useEffect(() => {
    Animated.timing(animation, {
      useNativeDriver: false,
      toValue: expanded ? 1 : 0,
      easing: Easing.quad,
      duration: 250,
    }).start();
  }, [expanded, animation]);

  return (
    <>
      <TouchableOpacity
        accessibilityRole={accessibilityRole ?? 'button'}
        accessibilityLabel={accessibilityLabel}
        accessibilityState={accessibilityState}
        accessibilityHint={accessibilityHint}
        accessibilityValue={
          accessibilityValue ?? (expanded ? { text: t('accessibility.control.combobox.expanded') } : undefined)
        }
        disabled={disabled}
        style={[styles.toggle, { borderColor: colorScheme.lighterGrey }]}
        activeOpacity={'expanded' in props && !props.onPress ? 1 : undefined}
        onPress={'onPress' in props ? props.onPress : toggleExpanded}>
        <ListItem style={styles.listItem} rightAccessory={<CaretIcon color={colorScheme.accent} />} {...props} />
        {headerNotice}
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.dataDrawer,
          contentSize
            ? {
                height: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, contentSize],
                  extrapolate: 'clamp',
                }),
              }
            : undefined,
        ]}>
        <View
          onLayout={onContentLayout}
          style={[styles.dataWrapper, { backgroundColor: colorScheme.background }, contentStyle]}>
          {children}
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  dataDrawer: {
    overflow: 'hidden',
  },
  dataWrapper: {
    paddingHorizontal: 12,
    position: 'absolute',
    width: '100%',
  },
  listItem: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  toggle: {
    borderWidth: 1,
    padding: 11,
  },
});

export default Accordion;
