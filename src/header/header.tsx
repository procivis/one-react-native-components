import React, { FunctionComponent, ReactNode } from 'react';
import {
  ColorValue,
  Insets,
  StyleProp,
  StyleSheet,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

import { TouchableOpacity } from '../accessibility';
import { BackButton, BackButtonProps } from '../buttons';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';
import { concatTestID } from '../utils';

export interface HeaderActionButton extends TouchableOpacityProps {
  key: React.Key;
  content: React.ComponentType;
}

type HeaderAdditionalButtons =
  | {
      actionButtons: HeaderActionButton[];
      rightButton?: never;
    }
  | {
      actionButtons?: never;
      rightButton?: ReactNode;
    };

export type HeaderProps = ViewProps &
  HeaderAdditionalButtons & {
    textColor?: ColorValue;
    style?: StyleProp<ViewStyle>;
    title: string | ReactNode;
    description?: string | ReactNode;
    onBack?: () => void;
    backButtonType?: BackButtonProps['type'];
  };

const backButtonHitSlop: Insets = { top: 8, bottom: 12, left: 24, right: 24 };

/**
 * Unified screen header
 *
 * Following the design: https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=9%3A1677
 */
const Header: FunctionComponent<HeaderProps> = ({
  testID,
  title,
  description,
  style,
  onBack,
  backButtonType,
  actionButtons = [],
  rightButton,
  textColor,
  ...viewProps
}) => {
  const colorScheme = useAppColorScheme();
  return (
    <View testID={testID} style={[styles.container, style]} {...viewProps}>
      <View style={styles.backButtonWrapper}>
        {onBack ? (
          <BackButton
            testID={concatTestID(testID, 'back')}
            onPress={onBack}
            hitSlop={backButtonHitSlop}
            type={backButtonType}
          />
        ) : null}
        <View />
        {rightButton}
      </View>
      <View style={styles.titleWrapper}>
        {typeof title === 'string' ? (
          <Typography
            testID={concatTestID(testID, 'title')}
            color={textColor ?? colorScheme.text}
            bold={true}
            size="h1"
            accessibilityRole="header"
            style={styles.title}>
            {title}
          </Typography>
        ) : (
          title
        )}
        <View style={styles.actionButtons}>
          {actionButtons.map(({ key, content: Content, ...touchableProps }) => (
            <TouchableOpacity
              testID={concatTestID(testID, `action-${key}`)}
              accessibilityRole="button"
              key={key}
              style={styles.actionButtonWrapper}
              {...touchableProps}>
              <Content />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {description ? (
        <View style={styles.descriptionWrapper}>
          {typeof description === 'string' ? (
            <Typography testID={concatTestID(testID, 'description')} color={textColor ?? colorScheme.text}>
              {description}
            </Typography>
          ) : (
            description
          )}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtonWrapper: {
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    padding: 4,
    width: 48,
  },
  actionButtons: {
    flexDirection: 'row',
    minWidth: 4,
  },
  backButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 38,
    paddingHorizontal: 24,
    paddingTop: 8,
    width: '100%',
  },
  container: {
    paddingBottom: 12,
    width: '100%',
  },
  descriptionWrapper: {
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  title: {
    flex: 1,
    marginBottom: 12,
    paddingTop: 6,
  },
  titleWrapper: {
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 20,
    width: '100%',
  },
});

export default Header;
