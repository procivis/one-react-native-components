import { CredentialSchema } from '@procivis/react-native-one-core';
import { useIsFocused } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ActionModal,
  ActivityIndicator,
  Button,
  ButtonType,
  RadioGroup,
  RadioGroupItem,
  useAppColorScheme,
} from '../../ui-components';
import ListPageLoadingIndicator from '../../ui-components/list/list-page-loading-indicator';
import { concatTestID, useCredentialSchemas } from '../../utils';

export type CredentialSchemaPickerLabels = {
  all: string;
  close: string;
};

export interface CredentialSchemaPickerProps {
  labels: CredentialSchemaPickerLabels;
  onClose: () => void;
  onSelection: (credentialSchemaId: CredentialSchema['id'] | undefined) => void;
  selected?: CredentialSchema['id'];
  testID?: string;
  visible: boolean;
}

export const CredentialSchemaPicker: FC<CredentialSchemaPickerProps> = ({
  labels,
  selected,
  testID = 'CredentialSchemaPicker',
  visible,
  onSelection,
  onClose,
}) => {
  const isFocused = useIsFocused();
  const colorScheme = useAppColorScheme();
  const { bottom: bottomInset } = useSafeAreaInsets();

  const {
    data: credentialSchemas,
    fetchNextPage: fetchNextSchemasPage,
    hasNextPage: hasNextSchemasPage,
    isLoading,
  } = useCredentialSchemas();

  const handleSchemasEndReached = useCallback(() => {
    if (hasNextSchemasPage) {
      fetchNextSchemasPage().catch(() => {});
    }
  }, [fetchNextSchemasPage, hasNextSchemasPage]);

  const handleCredentialSchemaChange = useCallback(
    (item: RadioGroupItem) => {
      const credentialSchemaId = `${item.key}` || undefined;
      onSelection(credentialSchemaId);
    },
    [onSelection],
  );

  return (
    <ActionModal
      contentStyle={[styles.filterModalContent, { paddingBottom: bottomInset }]}
      testID={testID}
      visible={visible}>
      {credentialSchemas ? (
        <RadioGroup
          containerStyle={styles.containerStyle}
          items={[
            {
              key: '',
              label: labels.all,
            },
            ...credentialSchemas.pages.flat().map((credentialSchema) => ({
              key: credentialSchema.id,
              label: credentialSchema.name,
            })),
          ]}
          listFooter={
            isLoading ? <ListPageLoadingIndicator color={colorScheme.accent} style={styles.footer} /> : undefined
          }
          onEndReached={handleSchemasEndReached}
          onSelected={handleCredentialSchemaChange}
          selectedItem={selected ?? ''}
          style={styles.filterGroup}
        />
      ) : (
        <ActivityIndicator animate={isFocused} />
      )}
      <Button
        onPress={onClose}
        style={[styles.closeButton, { borderColor: colorScheme.background }]}
        testID={concatTestID(testID, 'close')}
        title={labels.close}
        type={ButtonType.Secondary}
      />
    </ActionModal>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    borderWidth: 1,
  },
  containerStyle: {
    paddingTop: 12,
  },
  filterGroup: {
    marginBottom: 12,
  },
  filterModalContent: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    maxHeight: '45%',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  footer: {
    marginVertical: 16,
  },
});
