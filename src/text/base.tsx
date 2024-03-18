import React, { PropsWithChildren, useEffect } from 'react';
import { ColorValue, StyleProp, Text, TextProps, TextStyle } from 'react-native';

import { useAccessibilityAnnouncementCumulative } from '../accessibility/accessibility';
import font from '../theme/font';

export type BaseTextProps = TextProps & {
  align?: 'center' | 'left' | 'right';
  color?: ColorValue;
  bold?: boolean;
  style?: StyleProp<TextStyle>;

  /* accessibility automatic voice-over */
  announcementActive?: boolean;
  announcementCumulative?: boolean;
  /* only supported (fired) on iOS */
  onAnnouncementFinished?: (finished: boolean) => void;
};

export const BaseText = React.forwardRef<Text, PropsWithChildren<BaseTextProps>>(
  (
    {
      align = 'left',
      color = 'white',
      bold = false,
      style,
      children,
      announcementActive,
      announcementCumulative,
      onAnnouncementFinished,
      ...props
    },
    ref,
  ) => {
    const announcementFinished = useAccessibilityAnnouncementCumulative(
      announcementActive && typeof children === 'string' ? (children as string) : undefined,
      announcementCumulative,
    );
    useEffect(() => {
      onAnnouncementFinished?.(announcementFinished);
    }, [announcementFinished, onAnnouncementFinished]);

    const fontStyle = bold ? font.bold : font.normal;
    const baseStyle: TextStyle = {
      textAlign: align,
      color,
    };

    return (
      <Text ref={ref} style={[fontStyle, baseStyle, style]} maxFontSizeMultiplier={2} {...props}>
        {children}
      </Text>
    );
  },
);

BaseText.displayName = 'BaseText';
