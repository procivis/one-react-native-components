import Picker from '@procivis/react-native-picker';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import type { TouchableOpacityProps } from 'react-native';

import { useForwardedRef } from '../../utils/ref';
import { focusAccessibility } from '../accessibility/accessibility';
import { TouchableOpacity, TouchableOpacityRef } from '../accessibility/accessibilityHistoryWrappers';
import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
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
const SelectionInput = forwardRef<TouchableOpacityRef, SelectionInputProps>(
  (
    { selectedValue, values, label, pickerTitle, pickerConfirmLabel, pickerCancelLabel, onChange, error, ...props },
    ref,
  ) => {
    const t = useAccessibilityTranslation();
    const colorScheme = useAppColorScheme();
    const selectedChoice = useMemo(
      () => (selectedValue !== undefined ? values.find(({ value }) => value === selectedValue) : undefined),
      [selectedValue, values],
    );

    const [forwardedRef, refObject] = useForwardedRef(ref);
    const [pickerOpen, setPickerOpen] = useState(false);

    const onOpen = useCallback(() => setPickerOpen(true), []);
    const onConfirm = useCallback(
      (valueLabel: any) => {
        setPickerOpen(false);
        const choice = values.find(({ label: choiceLabel }) => choiceLabel === valueLabel);
        if (!choice || !onChange?.(choice)) {
          setTimeout(() => focusAccessibility(refObject.current), 200);
        }
      },
      [onChange, refObject, values],
    );
    const onCancel = useCallback(() => {
      setPickerOpen(false);
      requestAnimationFrame(() => focusAccessibility(refObject.current));
    }, [refObject]);

    const accessibilityLabel = error ? `${label}, ${error}` : label;
    return (
      <TouchableOpacity
        accessibilityHint={t('accessibility.control.combobox.tapToSelect')}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="combobox"
        accessibilityValue={{ text: selectedChoice?.label }}
        onPress={onOpen}
        ref={forwardedRef}
        {...props}>
        <TextInput
          accessory={TextInputAccessory.Dropdown}
          disabled={true}
          error={error}
          label={label}
          pointerEvents="none"
          value={selectedChoice?.shortLabel ?? selectedChoice?.label}
        />
        <Picker
          cancelText={pickerCancelLabel}
          confirmText={pickerConfirmLabel}
          items={values.map(({ label: itemLabel }) => itemLabel)}
          modal
          mode="list"
          onCancel={onCancel}
          onConfirm={onConfirm}
          open={pickerOpen}
          selectedValue={selectedChoice?.label}
          textColor={colorScheme.text}
          title={pickerTitle ?? label}
        />
      </TouchableOpacity>
    );
  },
);

SelectionInput.displayName = 'SelectionInput';
export default SelectionInput;
