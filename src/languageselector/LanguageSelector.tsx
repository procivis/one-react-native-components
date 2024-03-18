import React, { FunctionComponent, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ActionModal from '../actionmodal/ActionModal';
import { Button } from '../buttons';
import { RadioGroup } from '../input';
import { Typography } from '../text';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 24,
  },
  containerTop: {
    paddingHorizontal: 12,
  },
  item: {
    marginBottom: 24,
  },
});

export type LanguageOption = {
  key: string;
  label: string;
};

export interface LanguageSelectorLabels {
  modalTitle: string;
  modalDescription: string;
  confirmButtonTitle: string;
}

interface Props {
  visible: boolean;
  options: LanguageOption[];
  initialLanguage: string;
  labels: LanguageSelectorLabels;
  onClose: (selectedLanguage: string) => void;
}

const LanguageSelector: FunctionComponent<Props> = ({ visible, labels, options, initialLanguage, onClose }) => {
  const insets = useSafeAreaInsets();
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);

  const onLanguageSelected = useCallback((item) => {
    setSelectedLanguage(item.key);
  }, []);

  const onCloseHandler = useCallback(() => {
    onClose(selectedLanguage);
  }, [onClose, selectedLanguage]);

  return (
    <ActionModal visible={visible}>
      <View style={[styles.container, { paddingBottom: Math.max(12, insets.bottom) }]}>
        <View style={styles.containerTop}>
          <Typography accessible={false} size="h2" bold={true} align="center" style={styles.item}>
            {labels.modalTitle}
          </Typography>
          <Typography style={styles.item}>{labels.modalDescription}</Typography>
          <RadioGroup items={options} selectedItems={[selectedLanguage]} onSelected={onLanguageSelected} />
        </View>
        <Button onPress={onCloseHandler}>{labels.confirmButtonTitle}</Button>
      </View>
    </ActionModal>
  );
};

export default LanguageSelector;
