import React, { FunctionComponent, ReactNode } from 'react';
import { AccessibilityProps, ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { TouchableOpacity } from '../accessibility';
import { ImageOrComponent, ImageOrComponentSource } from '../image';
import ArrowRightIcon from '../settings/arrow-right';
import { Typography, TypographyProps } from '../text';
import { useAppColorScheme } from '../theme';

interface Badge {
  text: string;
  icon?: ImageOrComponentSource;
}

export interface ListItemProps extends AccessibilityProps {
  testID?: string;
  title: string;
  subtitle?: string;
  status?: Readonly<{
    text: string | undefined;
    badge?: string | Badge[];
    icon?: ImageOrComponentSource;
    textStyle?: TypographyProps;
    badgeStyle?: TypographyProps;
  }>;

  icon?: ImageOrComponentSource;
  iconStyle?: StyleProp<ImageStyle>;

  disabled?: boolean;

  /**
   * (Optional) if provided, make the content tappable (but not the {@link rightAccessory} part).
   * @note This is due to accessibility reasons, the {@link rightAccessory} can be a separate accessibility item(s).
   * @hint In order to make the entire item tappable wrap it in a Touchable
   */
  onPress?: () => void;

  style?: StyleProp<ViewStyle>;
  rightAccessory?: ReactNode;
  touchableRightAccessory?: boolean;

  /* overrides for defaults */
  titleStyle?: TypographyProps;
  subtitleStyle?: TypographyProps;
}

const ListItem: FunctionComponent<ListItemProps> = ({
  testID,
  style,
  title,
  subtitle,
  status,
  icon,
  disabled,
  onPress,
  iconStyle,
  rightAccessory,
  touchableRightAccessory = true,
  titleStyle = {},
  subtitleStyle = {},
  ...accessibilityProps
}) => {
  const colorScheme = useAppColorScheme();
  const badges: Badge[] | undefined = status?.badge
    ? typeof status.badge === 'string'
      ? [{ text: status.badge }]
      : status.badge
    : undefined;

  const Wrapper = onPress && touchableRightAccessory ? TouchableOpacity : View;
  const LeftPartWrapper = onPress && !touchableRightAccessory ? TouchableOpacity : View;

  const { paddingVertical, paddingBottom, paddingTop } = StyleSheet.flatten(style) ?? {};
  return (
    <Wrapper
      testID={testID}
      style={[
        styles.itemRowContainer,
        { backgroundColor: disabled ? colorScheme.background : colorScheme.white },
        style,
        styles.resetVerticalPadding,
      ]}
      onPress={onPress}
      disabled={disabled}
      {...(!onPress || touchableRightAccessory ? accessibilityProps : {})}>
      <LeftPartWrapper
        accessibilityRole="button"
        style={[
          styles.leftPart,
          rightAccessory || rightAccessory === undefined ? styles.withAccessory : undefined,
          { paddingVertical: paddingVertical ?? 12, paddingBottom, paddingTop },
        ]}
        onPress={onPress}
        disabled={disabled}
        {...(onPress && !touchableRightAccessory ? accessibilityProps : {})}>
        {icon ? <ImageOrComponent source={icon} style={[styles.itemIcon, iconStyle]} /> : null}
        <View style={styles.itemText}>
          <Typography
            bold={true}
            color={disabled ? colorScheme.lightGrey : colorScheme.black}
            numberOfLines={1}
            ellipsizeMode={'tail'}
            {...titleStyle}>
            {title}
          </Typography>
          {subtitle ? (
            <Typography
              style={styles.subtitle}
              color={colorScheme.black}
              numberOfLines={1}
              ellipsizeMode={'tail'}
              {...subtitleStyle}>
              {subtitle}
            </Typography>
          ) : null}
          {status ? (
            <View style={styles.statusRow}>
              {status.icon ? <ImageOrComponent source={status.icon} style={styles.statusIcon} /> : null}
              {status.text ? (
                <Typography
                  style={[styles.statusText]}
                  size="sml"
                  color={colorScheme.black}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  {...status.textStyle}>
                  {status.text}
                </Typography>
              ) : null}
              {badges?.map((badge, i) => (
                <View
                  style={[
                    styles.statusBadge,
                    { borderColor: colorScheme.lighterGrey },
                    i > 0 ? styles.statusBadgeMargin : undefined,
                    badge.icon ? undefined : styles.statusBadgeWithoutIcon,
                  ]}>
                  {badge.icon ? <ImageOrComponent source={badge.icon} style={styles.statusIcon} /> : null}
                  <Typography
                    key={i}
                    size="sml"
                    color={colorScheme.black}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    {...status.badgeStyle}>
                    {badge.text}
                  </Typography>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </LeftPartWrapper>
      {rightAccessory === undefined ? (
        <ArrowRightIcon style={styles.listItemArrow} color={colorScheme.accent} />
      ) : (
        rightAccessory
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  itemIcon: {
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginRight: 12,
    width: 48,
  },
  itemRowContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  itemText: {
    flex: 1,
    justifyContent: 'center',
  },
  leftPart: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  listItemArrow: {
    margin: 8,
  },
  resetVerticalPadding: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  statusBadge: {
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 1,
    flexDirection: 'row',
    height: 24,
    paddingRight: 6,
  },
  statusBadgeMargin: {
    marginLeft: 5,
  },
  statusBadgeWithoutIcon: {
    paddingLeft: 6,
  },
  statusIcon: {
    height: 24,
    marginRight: 2,
    width: 24,
  },
  statusRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 4,
  },
  statusText: {
    marginRight: 4,
  },
  subtitle: {
    marginTop: 4,
  },
  withAccessory: {
    marginRight: 12,
  },
});

export default ListItem;
