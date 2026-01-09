import { GetTrustEntityResponseBindingDto } from '@procivis/react-native-one-core';
import React, { FC, memo, useCallback, useMemo } from 'react';
import { Linking, StyleSheet, View } from 'react-native';

import { Button, ButtonType } from '../../ui-components/buttons';
import { EntityLabels } from '../../ui-components/screens/nerd-mode-screen';
import { concatTestID, reportException } from '../../utils';

export interface EntityButton {
  url: string;
  label: string;
}

interface EntityButtonsProps {
  entity?: GetTrustEntityResponseBindingDto;
  labels: EntityLabels;
  testID?: string;
}

const EntityButtons: FC<EntityButtonsProps> = ({ entity, labels, testID }) => {
  const buttons = useMemo(
    () =>
      [
        {
          label: labels.visitWebsite,
          url: entity?.website || '',
          testID: 'website',
        },
        {
          label: labels.termsAndServices,
          url: entity?.termsUrl || '',
          testID: 'termsOfService',
        },
        {
          label: labels.privacyPolicy,
          url: entity?.privacyUrl || '',
          testID: 'privacyPolicy',
        },
      ].filter((btn) => Boolean(btn.url)),
    [entity, labels],
  );

  const openURL = useCallback(
    (url: string) => () => {
      Linking.openURL(url).catch((e) => {
        reportException(e, 'Error opening entity link');
      });
    },
    [],
  );
  return (
    <View style={[styles.buttons]} testID={testID}>
      {buttons.map(({ label, url, testID: testIdSuffix }) => (
        <Button
          key={label}
          title={label}
          onPress={openURL(url)}
          style={styles.urlButton}
          testID={concatTestID(testID, testIdSuffix)}
          type={ButtonType.SmallTech}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    paddingBottom: 10,
    paddingHorizontal: 12,
  },
  urlButton: {
    borderRadius: 4,
    borderWidth: 0,
    marginTop: 4,
  },
});

export default memo(EntityButtons);
