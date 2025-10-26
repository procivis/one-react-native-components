import WheelPicker from '@quidone/react-native-wheel-picker';
import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacityProps, View } from 'react-native';

import { Typography } from '..';
import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import { useAppColorScheme } from '../theme';
import TextInput, { TextInputAccessory } from './text-input';

export interface SelectionInputChoice {
  label: string;
  /**
   * If specified used in the input display, otherwise {@link label} used.
   * The {@link label} is always used for the picker values.
   */
  shortLabel?: string;
  value: string | number;
}

export interface SelectionInputProps extends TouchableOpacityProps {
  error?: string;
  label: string;
  /**
   * Called when selection changes
   * @return `true` to avoid accessibility auto-focusing, `false` otherwise
   */
  onChange?: (value: SelectionInputChoice) => boolean;
  pickerCancelLabel: string;
  pickerConfirmLabel: string;
  pickerTitle?: string;
  /** {@link SelectionInputChoice.label} of the selected choice */
  selectedValue?: string | number;
  values: SelectionInputChoice[];
}

/**
 * Generic selection input component
 * @see https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=4%3A127&t=B2Y3PtJHH22XDPkx-0
 */

const SelectionInput: FC<SelectionInputProps> = ({
  selectedValue,
  label,
  values,
  pickerCancelLabel,
  pickerConfirmLabel,
  onChange,
  ...props
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [wheelPickerValue, setWheelPickerValue] = useState(selectedValue);
  const colorScheme = useAppColorScheme();

  const selectedChoice = useMemo(
    () => (selectedValue !== undefined ? values.find(({ value }) => value === selectedValue) : undefined),
    [selectedValue, values],
  );

  const onCancel = useCallback(() => {
    setModalVisible(false);
  }, []);

  const onConfirm = useCallback(() => {
    const choice = values.find(({ value }) => value === wheelPickerValue);
    if (choice && onChange) {
      onChange(choice);
    }

    setModalVisible(false);
  }, [onChange, values, wheelPickerValue]);

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)} {...props}>
        <TextInput
          accessory={TextInputAccessory.Dropdown}
          disabled={true}
          label={label}
          pointerEvents="none"
          value={selectedChoice?.shortLabel ?? selectedChoice?.label}
        />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        backdropColor={'rgba(0,0,0,0.1)'}
        onDismiss={() => setModalVisible(false)}
        onRequestClose={onCancel}
        style={styles.modal}
        visible={modalVisible}>
        <View style={styles.modalContent}>
          <WheelPicker
            data={values}
            onValueChanged={({ item: { value } }: { item: { value?: string | number } }) => setWheelPickerValue(value)}
            value={wheelPickerValue || ''}
            visibleItemCount={5}
          />
          <View style={styles.buttons}>
            <TouchableOpacity onPress={onCancel}>
              <Typography color={colorScheme.black} preset="s">
                {pickerCancelLabel}
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm}>
              <Typography color={colorScheme.black} preset="s">
                {pickerConfirmLabel}
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'flex-end',
  },

  modal: {},
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 2,
    margin: 'auto',
    padding: 20,
    width: '80%',
  },
});

export default memo(SelectionInput);
