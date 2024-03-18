import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';

export enum NavigationTabsLayoutVariant {
  Static = 'static',
  Floating = 'floating',
}

type Props = BottomTabBarProps & {
  variant: NavigationTabsLayoutVariant;
};

const NavigationTabs: FunctionComponent<Props> = ({ variant, state, descriptors, navigation }) => {
  const colorScheme = useAppColorScheme();
  const t = useAccessibilityTranslation();
  const safeAreaInsets = useSafeAreaInsets();

  const floating = variant === NavigationTabsLayoutVariant.Floating;
  const bottomPlacement = Math.max(safeAreaInsets.bottom, 24);

  return (
    <View
      style={[
        styles.tabBar,
        floating ? styles.tabBarFloating : styles.tabBarStatic,
        {
          backgroundColor: floating ? colorScheme.accent : colorScheme.white,
          borderColor: floating ? colorScheme.glow : colorScheme.lighterGrey,
        },
        floating ? { marginBottom: bottomPlacement } : { paddingBottom: bottomPlacement },
      ]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const labelColor = floating
          ? isFocused
            ? colorScheme.accentText
            : colorScheme.accentTextSecondary
          : isFocused
          ? colorScheme.text
          : colorScheme.lightGrey;

        const icon = options.tabBarIcon?.({
          focused: isFocused,
          color: labelColor,
          size: 24,
        });
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="tab"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            accessibilityValue={{
              text: t('accessibility.control.order', { current: index + 1, length: state.routes.length }),
            }}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabBarItem, !index && styles.tabBarItemFirst]}
            key={index}>
            <View style={styles.icon}>{icon}</View>
            <Typography size="sml" numberOfLines={1} ellipsizeMode="tail" color={labelColor} bold={isFocused}>
              {label}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    height: 24,
    justifyContent: 'center',
    marginBottom: 4,
    width: 24,
  },
  tabBar: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  tabBarFloating: {
    borderRadius: 12,
    borderWidth: 2,
    bottom: 0,
    justifyContent: 'center',
    left: 20,
    padding: 12,
    position: 'absolute',
    right: 20,
  },
  tabBarItem: {
    alignItems: 'center',
    flex: 1,
    marginLeft: 12,
  },
  tabBarItemFirst: {
    marginLeft: 0,
  },
  tabBarStatic: {
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    width: '100%',
  },
});

/**
 * Dashboard screen bottom tab navigation
 * Defines a decorator to be used via `@react-navigation/bottom-tabs:BottomTabNavigationConfig.tabBar`
 * @see https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=9%3A544&t=SFRanLubte7Spc4k-4
 */
const navigationTabsDecorator = (variant: NavigationTabsLayoutVariant) => {
  const DecoratedTabBar = (bottomTabBarProps: BottomTabBarProps) => (
    <NavigationTabs variant={variant} {...bottomTabBarProps} />
  );
  return DecoratedTabBar;
};

export default navigationTabsDecorator;
