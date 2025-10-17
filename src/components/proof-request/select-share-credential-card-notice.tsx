import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import { Button, ButtonType } from '../../ui-components';
import { concatTestID } from '../../utils';
import { ShareCredentialCardNotice, ShareCredentialCardNoticeProps } from './share-credential-card-notice';

export type SelectShareCredentialCardNoticeProps = ShareCredentialCardNoticeProps & {
  buttonTitle: string;
  onPress?: () => void;
};

export const SelectShareCredentialCardNotice: FC<SelectShareCredentialCardNoticeProps> = ({
  buttonTitle,
  onPress,
  testID,
  text,
}) => {
  return (
    <ShareCredentialCardNotice testID={testID} text={text}>
      <Button
        onPress={onPress}
        style={styles.noticeButton}
        testID={concatTestID(testID, 'button')}
        title={buttonTitle}
        type={ButtonType.Secondary}
      />
    </ShareCredentialCardNotice>
  );
};

const styles = StyleSheet.create({
  noticeButton: {
    marginTop: 24,
    paddingVertical: 11,
  },
});
