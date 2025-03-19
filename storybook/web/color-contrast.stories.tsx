import type { Meta, StoryObj } from '@storybook/react';
import React, { FC } from 'react';
import { ColorValue, StyleSheet, View } from 'react-native';

import { Typography } from '../../src/ui-components/text';
import { ColorScheme, useAppColorScheme } from '../../src/ui-components/theme';
import { colorArray } from '../../src/utils/color';

// https://stackoverflow.com/a/9733420
const getLuminanace = (color: number[]) => {
  const rgb = color.map((val) => (val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4));
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
};
const mixAlpha = (x: number, y: number, alpha: number) => x * alpha + y * (1 - alpha);
const getColorWithBackground = (foreground: number[], background: number[], foregroundAlpha: number) => {
  const [rf, gf, bf] = foreground;
  const [rb, gb, bb] = background;
  return [mixAlpha(rf, rb, foregroundAlpha), mixAlpha(gf, gb, foregroundAlpha), mixAlpha(bf, bb, foregroundAlpha)];
};
const getContrastRatio = (colorF: ColorValue, colorB: ColorValue) => {
  const [rf, gf, bf, af] = colorArray(colorF);
  const [rb, gb, bb, ab] = colorArray(colorB);
  // if background is semi-transparent, mix in the foreground color to check the minimal possible contrast
  const backgroundMixed = getColorWithBackground([rb, gb, bb], [rf, gf, bf], ab);
  const lumA = getLuminanace(getColorWithBackground([rf, gf, bf], backgroundMixed, af));
  const lumB = getLuminanace(backgroundMixed);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
};

interface TestProps {
  name: string;
  colorF: string;
  colorB: string;
  AAlimit: number;
  AAAlimit: number;
}

enum Rating {
  AAA,
  AA,
  None,
}

type SimpleColorName = keyof Omit<ColorScheme, 'darkMode' | 'nerdView'>;
const RATING_COLOR: Record<Rating, SimpleColorName> = {
  [Rating.AAA]: 'success',
  [Rating.AA]: 'warning',
  [Rating.None]: 'error',
};

const getRatingText = (rating: Rating, AAlimit: number, AAAlimit: number) => {
  switch (rating) {
    case Rating.AAA:
      return `AAA (${AAAlimit}:1)`;
    case Rating.AA:
      return `AA (${AAlimit}:1, AAA=${AAAlimit}:1)`;
    default:
      return `X (AAA=${AAAlimit}:1, AA=${AAlimit}:1)`;
  }
};

const Test: FC<TestProps> = ({ name, colorF, colorB, AAlimit, AAAlimit }) => {
  const colorScheme = useAppColorScheme();
  const contrast = getContrastRatio(colorF, colorB);
  const rating = contrast >= AAAlimit ? Rating.AAA : contrast >= AAlimit ? Rating.AA : Rating.None;
  const ratingText = getRatingText(rating, AAlimit, AAAlimit);
  return (
    <View style={styles.testContainer}>
      <Typography preset="m" color="black">
        {name}
      </Typography>
      <View style={{ backgroundColor: colorScheme.white }}>
        <Typography color={colorF} style={{ backgroundColor: colorB }} align="center">
          {`TEXT ${colorF}/${colorB}`}
        </Typography>
      </View>
      <View style={styles.resultContainer}>
        <Typography color="black">
          {'Contrast: '}
          <Typography color="black" preset="m">
            {contrast.toFixed(2).replace(/[0.]+$/, '')}
          </Typography>
          {':1'}
        </Typography>
        <Typography color={colorScheme[RATING_COLOR[rating]]}>{ratingText}</Typography>
      </View>
    </View>
  );
};

const TextBackgroundTest: FC<{ text: SimpleColorName; background: SimpleColorName }> = ({ text, background }) => {
  const colorScheme = useAppColorScheme();
  return (
    <Test
      name={`${text} on ${background}`}
      colorF={colorScheme[text]}
      colorB={colorScheme[background]}
      AAlimit={4.5}
      AAAlimit={7}
    />
  );
};

export const ColorContrast: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <TextBackgroundTest text="text" background="white" />
      <TextBackgroundTest text="text" background="background" />
      <TextBackgroundTest text="accentText" background="accent" />
      <TextBackgroundTest text="accent" background="background" />
      <TextBackgroundTest text="linkText" background="white" />
      <TextBackgroundTest text="linkText" background="background" />
    </View>
  ),
};

export default {
  title: 'test/Color Contrast',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=0-1',
    },
  },
} as Meta;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  testContainer: {
    marginBottom: 24,
  },
});
