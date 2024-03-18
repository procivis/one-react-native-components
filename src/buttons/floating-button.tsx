import React from 'react';
import { Insets, StyleSheet, TouchableOpacityProps, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Color, Path, Svg } from 'react-native-svg';

import { TouchableOpacity, TouchableOpacityRef } from '../accessibility/accessibilityHistoryWrappers';
import { AccessibilityLanguageFileEntryKey, useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';

interface IconProps {
  color: Color;
}

const AddIcon: React.FunctionComponent<IconProps> = ({ color }) => {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
      <Path
        d="M25.7143 13.0714C25.7143 12.7953 25.4904 12.5714 25.2143 12.5714H22.7857C22.5096 12.5714 22.2857 12.7953 22.2857 13.0714V22.2857H13.0714C12.7953 22.2857 12.5714 22.5096 12.5714 22.7857V25.2143C12.5714 25.4904 12.7953 25.7143 13.0714 25.7143H22.2857V34.9286C22.2857 35.2047 22.5096 35.4286 22.7857 35.4286H25.2143C25.4904 35.4286 25.7143 35.2047 25.7143 34.9286V25.7143H34.9286C35.2047 25.7143 35.4286 25.4904 35.4286 25.2143V22.7857C35.4286 22.5096 35.2047 22.2857 34.9286 22.2857H25.7143V13.0714Z"
        fill={color}
      />
    </Svg>
  );
};

const EditIcon: React.FunctionComponent<IconProps> = ({ color }) => {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
      <Path
        d="M29.4721 15.7176C29.4719 15.7174 29.4714 15.7174 29.4704 15.7174L29.4724 15.7194C29.4724 15.7184 29.4724 15.7179 29.4721 15.7176ZM16.1677 31.8392L16.6201 29.0149L26.1036 19.5179L28.492 21.9062L19.008 31.4022L16.1677 31.8392ZM29.9053 20.4911L32.0725 18.3212L29.6845 15.9319L27.5169 18.1026L29.9053 20.4911ZM14.9347 28.153L14 34L19.8647 33.094L33.5616 19.3815C34.1461 18.7962 34.1461 17.8461 33.5616 17.2608L30.7474 14.4445C30.4652 14.1599 30.0909 14.0036 29.6886 14.0016C29.3183 13.9815 28.9119 14.1559 28.6257 14.4405L14.9347 28.153Z"
        fill={color}
        fillRule="evenodd"
      />
    </Svg>
  );
};

const NextIcon: React.FunctionComponent<IconProps> = ({ color }) => {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
      <Path
        d="M24.8472 19.1442C24.6332 19.3583 24.6332 19.7067 24.8472 19.9207L27.2339 22.3075L15.4047 22.3075C15.101 22.3075 14.8571 22.5539 14.8571 22.855V24.2488C14.8571 24.5524 15.101 24.7963 15.4047 24.7963L27.2339 24.7963L24.8472 27.1831C24.6332 27.3971 24.6332 27.7455 24.8472 27.9596L25.8328 28.9451C26.0443 29.1567 26.3927 29.1567 26.6068 28.9451L32 23.5519L26.6068 18.1587C26.3927 17.9471 26.0443 17.9471 25.8328 18.1587L24.8472 19.1442Z"
        fill={color}
      />
    </Svg>
  );
};

const ICONS = {
  add: AddIcon,
  edit: EditIcon,
  next: NextIcon,
};

type IconName = keyof typeof ICONS;

const AccesssibilityLabels: Record<IconName, AccessibilityLanguageFileEntryKey> = {
  add: 'accessibility.icon.add',
  edit: 'accessibility.icon.edit',
  next: 'accessibility.nav.next',
};

export type FloatingButtonProps = TouchableOpacityProps & {
  icon: IconName;
} & (
    | {
        label: string;
      }
    | {
        label?: undefined;
        /** floating bottom-right screen position */
        bottomRight?: boolean;
      }
  );

const hitSlop: Insets = { top: 10, left: 10, bottom: 10, right: 10 };

/**
 * Generic floating button component
 * @see https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=8%3A812&t=YzONI8GYQhQiMmLw-4
 */
const FloatingButton = React.forwardRef<TouchableOpacityRef, FloatingButtonProps>(
  ({ icon, label, style, ...props }, ref) => {
    const t = useAccessibilityTranslation();
    const insets = useSafeAreaInsets();
    const colorScheme = useAppColorScheme();
    const Icon = ICONS[icon];
    const bottomRight = 'bottomRight' in props ? Boolean(props.bottomRight) : false;
    return (
      <TouchableOpacity
        ref={ref}
        style={[styles.button, bottomRight && [styles.bottomRight, { bottom: Math.max(24, insets.bottom) }], style]}
        hitSlop={hitSlop}
        accessibilityRole="button"
        accessibilityLabel={label || t(AccesssibilityLabels[icon])}
        {...props}>
        <View style={[styles.circle, { backgroundColor: colorScheme.accent, borderColor: colorScheme.white }]}>
          <Icon color={colorScheme.accentText} />
        </View>
        {label ? (
          <Typography style={styles.label} color={colorScheme.text}>
            {label}
          </Typography>
        ) : null}
      </TouchableOpacity>
    );
  },
);

FloatingButton.displayName = 'FloatingButton';
export default FloatingButton;

const styles = StyleSheet.create({
  bottomRight: {
    position: 'absolute',
    right: 0,
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 24,
  },
  circle: {
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  label: {
    marginLeft: 12,
  },
});
