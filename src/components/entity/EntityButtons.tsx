import { TrustEntity } from '@procivis/react-native-one-core';
import React, { FC, memo, useCallback, useMemo } from 'react';
import { Linking, StyleSheet, View } from 'react-native';

import { Button, ButtonType } from '../../ui-components/buttons';
import { EntityLabels } from '../../ui-components/screens/nerd-mode-screen';

export interface EntityButton {
  url: string;
  label: string;
}

interface EntityButtonsProps {
  entity?: TrustEntity;
  labels: EntityLabels;
}

const EntityButtons: FC<EntityButtonsProps> = ({ entity, labels }) => {
  const buttons = useMemo(
    () =>
      [
        {
          label: labels.visitWebsite,
          url: entity?.website || '',
        },
        {
          label: labels.termsAndServices,
          url: entity?.termsUrl || '',
        },
        {
          label: labels.privacyPolicy,
          url: entity?.privacyUrl || '',
        },
      ].filter((btn) => Boolean(btn.url)),
    [entity, labels],
  );

  const openURL = useCallback(
    (url: string) => () => {
      Linking.openURL(url);
    },
    [],
  );
  return (
    <View style={[styles.buttons]}>
      {buttons.map(({ label, url }) => (
        <Button key={label} title={label} onPress={openURL(url)} style={styles.urlButton} type={ButtonType.SmallTech} />
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
