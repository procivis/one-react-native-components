import React, { FunctionComponent, useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop, SvgProps } from 'react-native-svg';

import { colorArray } from '../utils/color';

export interface GradientBackgroundProps extends SvgProps {
  /**
   * Custom boundary colors
   * default: colorScheme.linearGradient
   */
  colors?: readonly [string, string];
  /**
   * Gradient color change direction
   * default: `undefined` (for background)
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * Flag for disabling absolute fill
   * default: `true`
   */
  absoluteFill?: boolean;
}

const linearGradient = ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)'];

const GradientBackground: FunctionComponent<GradientBackgroundProps> = ({
  style,
  colors,
  direction,
  absoluteFill = true,
  ...props
}) => {
  const sceenDimensions = useWindowDimensions();

  const width = props.width ?? sceenDimensions.width;
  const height = props.height ?? sceenDimensions.height;

  const svgColors = useMemo(
    () =>
      (colors ?? linearGradient).map(colorArray).map(([r, g, b, a]) => ({
        stopColor: `rgb(${r * 255},${g * 255},${b * 255})`,
        stopOpacity: a,
      })),
    [colors],
  );

  let gradientDirectionProps;
  switch (direction) {
    case 'vertical':
      gradientDirectionProps = {
        gradientTransform: 'rotate(90)',
      };
      break;
    case 'horizontal':
      gradientDirectionProps = {};
      break;
    default:
      gradientDirectionProps = { x1: 0, y1: 0, x2: 0, y2: 1 };
      break;
  }
  return (
    <Svg
      accessible={false}
      width={width}
      height={height}
      style={[absoluteFill ? StyleSheet.absoluteFill : undefined, style]}
      {...props}>
      <Defs>
        <LinearGradient id="grad" {...gradientDirectionProps}>
          <Stop offset={0} {...svgColors[0]} />
          <Stop offset={1} {...svgColors[1]} />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={width} height={height} fill="url(#grad)" />
    </Svg>
  );
};

export default GradientBackground;
