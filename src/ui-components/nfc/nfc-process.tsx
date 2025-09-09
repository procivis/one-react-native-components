import React, { FC, memo } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { HeaderCloseButton } from '../../components';
import { useAppColorScheme } from '../../ui-components';
import { concatTestID } from '../../utils';
import { Typography } from '..';
import { Button, ButtonType } from '../buttons';
import { NFCIcon, StatusWarningIcon } from '../icons';
import { LoaderViewState } from '../loader';
import { ScrollViewScreen } from '../screens';

interface NFCProcessProps {
  testID: string;
  processState: LoaderViewState;
  handleButtonClick: () => void;
  labels: {
    share: string;
    connectivity: string;
    close: string;
    tryAgain: string;
    conectivityInfo: string;
    shareInfo: string;
  };
}

const NFCProcess: FC<NFCProcessProps> = ({ testID, processState, labels, handleButtonClick }) => {
  const colorScheme = useAppColorScheme();

  return (
    <ScrollViewScreen
      header={{
        leftItem: <HeaderCloseButton testID={concatTestID(testID, 'header.back')} />,
        modalHandleVisible: Platform.OS === 'ios',
        static: true,
        testID: concatTestID(testID, 'header'),
        title: processState === LoaderViewState.InProgress ? labels.share : labels.connectivity,
      }}
      scrollView={{
        testID: concatTestID(testID, 'scroll'),
      }}
      testID={testID}>
      <View style={styles.content} testID={concatTestID(testID, 'content')}>
        <View style={styles.info}>
          {processState === LoaderViewState.InProgress ? <NFCIcon width={50} height={50} /> : <StatusWarningIcon />}
          <Typography align="center" color={colorScheme.black}>
            {processState === LoaderViewState.InProgress ? labels.shareInfo : labels.conectivityInfo}
          </Typography>
        </View>
      </View>
      <View style={styles.bottom}>
        <Button
          onPress={handleButtonClick}
          testID={concatTestID(testID, 'button')}
          title={processState === LoaderViewState.InProgress ? labels.close : labels.tryAgain}
          type={processState === LoaderViewState.InProgress ? ButtonType.Secondary : ButtonType.Primary}
        />
      </View>
    </ScrollViewScreen>
  );
};

const styles = StyleSheet.create({
  bottom: {
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  info: {
    alignItems: 'center',
    flex: 1,
    gap: 20,
    justifyContent: 'center',
  },
});

export default memo(NFCProcess);
