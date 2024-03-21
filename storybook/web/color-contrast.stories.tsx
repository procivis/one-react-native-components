import type { Meta, Story } from '@storybook/react';
import React, { FunctionComponent } from 'react';
import { ColorValue, StyleSheet, View } from 'react-native';

import { Typography } from '../../src/text';
import { ColorScheme, useAppColorScheme } from '../../src/theme';
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

const Test: FunctionComponent<TestProps> = ({ name, colorF, colorB, AAlimit, AAAlimit }) => {
  const colorScheme = useAppColorScheme();
  const contrast = getContrastRatio(colorF, colorB);
  const rating = contrast >= AAAlimit ? Rating.AAA : contrast >= AAlimit ? Rating.AA : Rating.None;
  const ratingText =
    rating === Rating.AAA
      ? `AAA (${AAAlimit}:1)`
      : rating === Rating.AA
      ? `AA (${AAlimit}:1, AAA=${AAAlimit}:1)`
      : `X (AAA=${AAAlimit}:1, AA=${AAlimit}:1)`;
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
        <Typography
          color={
            rating === Rating.AAA
              ? colorScheme.successText
              : rating === Rating.AA
              ? colorScheme.noticeText
              : colorScheme.alertText
          }
          style={{
            backgroundColor:
              rating === Rating.AAA
                ? colorScheme.success
                : rating === Rating.AA
                ? colorScheme.notice
                : colorScheme.alert,
          }}>
          {ratingText}
        </Typography>
      </View>
    </View>
  );
};

type SimpleColorName = keyof Omit<ColorScheme, 'shadow' | 'lineargradient'>;
const TextBackgroundTest: FunctionComponent<{ text: SimpleColorName; background: SimpleColorName }> = ({
  text,
  background,
}) => {
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

export const ColorContrast: Story = () => {
  return (
    <View style={styles.container}>
      <TextBackgroundTest text="text" background="white" />
      <TextBackgroundTest text="text" background="background" />
      <TextBackgroundTest text="textSecondary" background="white" />
      <TextBackgroundTest text="noticeText" background="notice" />
      <TextBackgroundTest text="alertText" background="alert" />
      <TextBackgroundTest text="alertText" background="white" />
      <TextBackgroundTest text="linkText" background="white" />
      <TextBackgroundTest text="accentText" background="accent" />
      <TextBackgroundTest text="accentTextSecondary" background="accent" />
      <TextBackgroundTest text="white" background="lightGrey" />
      <TextBackgroundTest text="white" background="overlay" />
      <TextBackgroundTest text="successText" background="overlay" />
      <TextBackgroundTest text="text" background="accent" />
      <TextBackgroundTest text="accentSecondary" background="accent" />
      <TextBackgroundTest text="accentText" background="accentSecondary" />
    </View>
  );
};

export default {
  title: 'test/Color Contrast',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=1%3A84&t=h6IOH7IquQkteXya-4',
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
