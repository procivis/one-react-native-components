import Picker from '@procivis/react-native-picker';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import type { TouchableOpacityProps } from 'react-native';

import { focusAccessibility } from '../accessibility/accessibility';
import { TouchableOpacity, TouchableOpacityRef } from '../accessibility/accessibilityHistoryWrappers';
import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import { useAppColorScheme } from '../theme';
import { useForwardedRef } from '../utils/ref';
import Input, { InputAccessory } from './text-input';

export interface SelectionInputChoice {
  label: string;
  /**
   * If specified used in the input display, otherwise {@link label} used.
   * The {@link label} is always used for the picker values.
   */
  shortLabel?: string;
}

export interface SelectionInputProps extends TouchableOpacityProps {
  label: string;
  pickerTitle?: string;
  pickerConfirmLabel: string;
  pickerCancelLabel: string;

  values: SelectionInputChoice[];
  /** {@link SelectionInputChoice.label} of the selected choice */
  selectedValue?: string;
  /**
   * Called when selection changes
   * @return `true` to avoid accessibility auto-focusing, `false` otherwise
   */
  onChange?: (value: SelectionInputChoice) => boolean;

  error?: string;
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
      () => (selectedValue !== undefined ? values.find(({ label }) => label === selectedValue) : undefined),
      [selectedValue, values],
    );

    const [forwardedRef, refObject] = useForwardedRef(ref);
    const [pickerOpen, setPickerOpen] = useState(false);

    const onOpen = useCallback(() => setPickerOpen(true), []);
    const onConfirm = useCallback(
      (valueLabel) => {
        setPickerOpen(false);
        const choice = values.find(({ label }) => label === valueLabel);
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
        ref={forwardedRef}
        accessibilityRole="combobox"
        accessibilityLabel={accessibilityLabel}
        accessibilityValue={{ text: selectedChoice?.label }}
        accessibilityHint={t('accessibility.control.combobox.tapToSelect')}
        onPress={onOpen}
        {...props}>
        <Input
          pointerEvents="none"
          label={label}
          error={error}
          value={selectedChoice?.shortLabel ?? selectedChoice?.label}
          disabled={true}
          accessory={InputAccessory.Dropdown}
        />
        <Picker
          modal
          mode="list"
          textColor={colorScheme.text}
          open={pickerOpen}
          selectedValue={selectedChoice?.label}
          items={values.map(({ label }) => label)}
          title={pickerTitle ?? label}
          confirmText={pickerConfirmLabel}
          cancelText={pickerCancelLabel}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      </TouchableOpacity>
    );
  },
);

SelectionInput.displayName = 'SelectionInput';
export default SelectionInput;
