import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAccessibilityFocus } from '../accessibility/accessibility';
import type { TouchableOpacityRef } from '../accessibility/accessibilityHistoryWrappers';
import { Button, ButtonProps, ButtonType } from '../buttons';
import { GradientBackground } from '../gradient';
import { ErrorStateIcon } from '../icons';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';
import { ContrastingStatusBar } from '../utils';

export enum ErrorScreenVariation {
  Neutral = 'neutral',
  Accent = 'accent',
}

export interface ErrorScreenButton {
  testID?: string;
  label: string;

  /** if `undefined`, the button is displayed disabled */
  onPress?: () => void;

  /** if `undefined`, the first button is primary, the others secondary */
  type?: ButtonProps['type'];
}

export interface ErrorScreenProps {
  testID?: string;
  variation: ErrorScreenVariation;
  title: string;
  subtitle: string;
  buttons: ErrorScreenButton[];
}

const ErrorScreen: FunctionComponent<ErrorScreenProps> = ({ testID, variation, title, subtitle, buttons }) => {
  const colorScheme = useAppColorScheme();

  const accentVariation = variation === ErrorScreenVariation.Accent;

  const [announcementFinished, setAnnouncementFinished] = useState(false);
  const accessibilityFocus = useAccessibilityFocus<TouchableOpacityRef>(announcementFinished);

  const backgroundColor = accentVariation ? colorScheme.accent : colorScheme.background;
  return (
    <>
      {!accentVariation && <GradientBackground />}
      <ContrastingStatusBar backgroundColor={backgroundColor} />
      <SafeAreaView testID={testID} style={[styles.content, { backgroundColor }]}>
        <View style={styles.top}>
          <Typography
            accessibilityRole="header"
            align="center"
            preset="xl"
            allowFontScaling={false}
            color={accentVariation ? colorScheme.accentText : colorScheme.text}>
            {title}
          </Typography>
          <Typography
            announcementActive={true}
            announcementCumulative={true}
            onAnnouncementFinished={setAnnouncementFinished}
            style={styles.subtitle}
            align="center"
            color={accentVariation ? colorScheme.accentText : colorScheme.text}>
            {subtitle}
          </Typography>
        </View>
        <View style={styles.statusWrapper}>
          <ErrorStateIcon accent={accentVariation} />
        </View>
        <View style={styles.bottom}>
          {buttons.map((button, index) => (
            <Button
              key={index}
              testID={button.testID}
              ref={index === 0 ? accessibilityFocus : undefined}
              type={button.type ?? accentVariation === !index ? ButtonType.SmallTech : ButtonType.Primary}
              disabled={!button.onPress}
              onPress={button.onPress}
              title={button.label}
            />
          ))}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  bottom: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    flex: 1,
    paddingBottom: 12,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  statusWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    paddingTop: 12,
  },
  top: {
    alignItems: 'center',
    flex: 1,
  },
});

export default ErrorScreen;
