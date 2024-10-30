import React, { FC, PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { concatTestID } from '../../utils/testID';
import BackButton from '../buttons/back-button';
import { Button, ButtonType } from '../buttons/button';
import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';
import ScrollViewScreen from './scroll-view-screen';

export enum BackupScreenMode {
  Create = 'create',
  Restore = 'restore',
}

export type BackupScreenProps = PropsWithChildren<{
  cta: string;
  description: string;
  isCtaDisabled?: boolean;
  onBack: () => void;
  onCta: () => void;
  testID: string;
  title: string;
}>;

const BackupScreen: FC<BackupScreenProps> = ({
  children,
  cta,
  description,
  isCtaDisabled,
  onBack,
  onCta,
  testID,
  title,
}) => {
  const colorScheme = useAppColorScheme();

  return (
    <ScrollViewScreen
      header={{
        backgroundColor: colorScheme.white,
        leftItem: <BackButton onPress={onBack} testID={concatTestID(testID, 'back')} />,
        title,
      }}
      scrollView={{
        testID: concatTestID(testID, 'scroll'),
      }}
      style={{ backgroundColor: colorScheme.white }}
      testID={testID}>
      <View style={styles.contentWrapper}>
        <View style={styles.content}>
          <Typography color={colorScheme.text} style={styles.description}>
            {description}
          </Typography>

          {children}
        </View>

        <View style={styles.bottom}>
          <Button
            disabled={isCtaDisabled}
            onPress={onCta}
            testID={concatTestID(testID, 'mainButton')}
            title={cta}
            type={isCtaDisabled ? ButtonType.Border : ButtonType.Primary}
          />
        </View>
      </View>
    </ScrollViewScreen>
  );
};

const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    minHeight: 84,
  },
  content: {
    marginHorizontal: 8,
  },
  contentWrapper: {
    flex: 1,
    marginHorizontal: 12,
  },
  description: {
    marginBottom: 24,
    opacity: 0.7,
  },
});

export default BackupScreen;
