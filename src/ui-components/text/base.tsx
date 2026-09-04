import React, { FC, PropsWithChildren, useEffect } from 'react';
import {
  ColorValue,
  HostInstance,
  StyleProp,
  Text,
  TextInstance,
  TextLayoutEvent,
  TextProps,
  TextStyle,
} from 'react-native';

import { useAccessibilityAnnouncementCumulative } from '../accessibility/accessibility';

export type BaseTextProps = TextProps & {
  align?: 'center' | 'left' | 'right';
  /* accessibility automatic voice-over */
  announcementActive?: boolean;
  announcementCumulative?: boolean;
  color: ColorValue;

  /* only supported (fired) on iOS */
  onAnnouncementFinished?: (finished: boolean) => void;
  onTextLayout?: (e: TextLayoutEvent) => void;
  style?: StyleProp<TextStyle>;
};

export const BaseText: FC<PropsWithChildren<BaseTextProps> & React.RefAttributes<HostInstance>> = React.forwardRef<
  TextInstance,
  PropsWithChildren<BaseTextProps>
>(
  (
    {
      align = 'left',
      color,
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
      announcementActive && typeof children === 'string' ? (children) : undefined,
      announcementCumulative,
    );
    useEffect(() => {
      onAnnouncementFinished?.(announcementFinished);
    }, [announcementFinished, onAnnouncementFinished]);

    const baseStyle: TextStyle = {
      color,
      textAlign: align,
    };

    return (
      <Text maxFontSizeMultiplier={2} ref={ref} style={[baseStyle, style]} {...props}>
        {children}
      </Text>
    );
  },
);

BaseText.displayName = 'BaseText';
