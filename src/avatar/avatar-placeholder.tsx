import React, { FunctionComponent, PropsWithChildren } from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';

import { Typography } from '../text';
import { useAppColorScheme } from '../theme';

interface Props {
  innerSize: number;
  pressed?: boolean;
  innerText?: string;
  innerTextStyle?: TextStyle;
  shape?: 'circle' | 'rect';
}

const defaultSize = 140;

const styles = StyleSheet.create({
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AvatarPlaceholder: FunctionComponent<PropsWithChildren<Props>> = ({
  innerSize,
  pressed,
  innerText,
  innerTextStyle,
  shape = 'circle',
  children,
}) => {
  const colorSchema = useAppColorScheme();
  const bgColor = pressed ? colorSchema.lightGrey : colorSchema.accent;

  const size = innerSize || defaultSize;

  const innerStyle = {
    borderRadius: shape === 'circle' ? size / 2 : 3,
    width: size,
    height: size,
    backgroundColor: bgColor,
  };

  return (
    <View accessibilityElementsHidden={true} style={[innerStyle, styles.innerContainer]}>
      {innerText ? (
        <Typography style={innerTextStyle} color={pressed ? colorSchema.text : colorSchema.accentText}>
          {innerText}
        </Typography>
      ) : null}
      {children}
    </View>
  );
};

export default AvatarPlaceholder;
