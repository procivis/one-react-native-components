import React, { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '../buttons';
import { DashedLine } from '../header/dashed-line';
import Receiver, { ReceiverProps } from '../receiver/Receiver';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';
import { concatTestID } from '../utils';
import FeatureScreen from './feature-screen';

export enum SharingScreenVariation {
  Neutral = 'neutral',
  Accent = 'accent',
}

export type SharingScreenProps = {
  testID?: string;
  variation: SharingScreenVariation;
  title: string;
  contentTitle?: string;
  cancelLabel: string;
  onCancel: () => void;
  submitLabel: string;
  onSubmit?: () => void;
} & ( // either custom content in the header part (https://www.figma.com/file/Mj9Nm9CUtauth6jt49UL7t/OTS-Developments-2023?type=design&node-id=34-29394&t=7l8toMV5OMHvayBk-4)
  | { header: ReactNode }
  // or Receiver
  | ReceiverProps
);

/**
 * Unified sharing screen
 *
 * Following the design: https://www.figma.com/file/baolhE7fB2BMdCN5RVjusX/App-Feature-Library?node-id=44%3A11111
 */
const SharingScreen: FunctionComponent<PropsWithChildren<SharingScreenProps>> = ({
  testID,
  variation,
  title,
  contentTitle,
  cancelLabel,
  onCancel,
  submitLabel,
  onSubmit,
  children,
  ...props
}) => {
  const colorScheme = useAppColorScheme();
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 24);

  return (
    <FeatureScreen
      testID={testID}
      title={title}
      headerBackground={variation === SharingScreenVariation.Neutral ? colorScheme.lineargradient : undefined}
      style={{
        backgroundColor: variation === SharingScreenVariation.Accent ? colorScheme.accent : colorScheme.background,
      }}
      headerTextColor={variation === SharingScreenVariation.Accent ? colorScheme.accentText : colorScheme.text}
      contentStyle={styles.screenOverride}>
      <View style={[styles.contentWrapper, { backgroundColor: colorScheme.white, ...colorScheme.shadow }]}>
        {'header' in props ? <View style={styles.header}>{props.header}</View> : <Receiver {...props} />}
        <DashedLine style={styles.dashedLine} color={colorScheme.lighterGrey} />
        {contentTitle ? (
          <Typography
            testID={concatTestID(testID, 'contentTitle')}
            size="sml"
            caps={true}
            accessibilityRole="header"
            style={styles.contentLabel}
            bold={true}
            color={colorScheme.text}>
            {contentTitle}
          </Typography>
        ) : null}
        <View style={styles.content}>{children}</View>
        <View style={[styles.buttonsContainer, { paddingBottom: bottomPadding }]}>
          <Button
            testID={concatTestID(testID, 'cancel')}
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
            type="light">
            {cancelLabel}
          </Button>
          <Button testID={concatTestID(testID, 'submit')} style={styles.button} disabled={!onSubmit} onPress={onSubmit}>
            {submitLabel}
          </Button>
        </View>
        {
          // iOS scroll bounce bottom white background below the content-wrapper
          Platform.OS === 'ios' && (
            <View style={styles.scrollOvershootWrapper}>
              <View style={[styles.scrollOvershoot, { backgroundColor: colorScheme.white }]} />
            </View>
          )
        }
      </View>
    </FeatureScreen>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 24,
  },
  cancelButton: {
    marginRight: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
  },
  contentLabel: {
    marginHorizontal: 12,
    marginVertical: 24,
  },
  contentWrapper: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 2,
    flex: 1,
    shadowRadius: 15,
  },
  dashedLine: {
    marginTop: 12,
  },
  header: {
    padding: 12,
    paddingBottom: 0,
  },
  screenOverride: {
    paddingBottom: 0,
    paddingHorizontal: 12,
  },
  scrollOvershoot: {
    height: 500,
    position: 'absolute',
    width: '100%',
  },
  scrollOvershootWrapper: {
    height: 0,
    width: '100%',
  },
});

export default SharingScreen;
