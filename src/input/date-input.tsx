import DatePicker from '@procivis/react-native-picker';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import type { TouchableOpacityProps } from 'react-native';

import { focusAccessibility } from '../accessibility/accessibility';
import { TouchableOpacity, TouchableOpacityRef } from '../accessibility/accessibilityHistoryWrappers';
import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import { useAppColorScheme } from '../theme';
import { formatDate } from '../utils/date';
import { useForwardedRef } from '../utils/ref';
import Input, { InputAccessory } from './text-input';

export interface DateInputProps extends TouchableOpacityProps {
  label: string;
  pickerTitle?: string;
  pickerConfirmLabel: string;
  pickerCancelLabel: string;
  value?: Date;

  /**
   * If no {@link value} specified, this is the initial picker date, default: today
   */
  defaultPickerDate?: Date;

  /**
   * Called when selection changes
   * @return `true` to avoid accessibility auto-focusing, `false` otherwise
   */
  onChange?: (value: Date) => boolean;
  error?: string;
  maximumDate?: Date;
  minimumDate?: Date;
  formatDateOptions?: { locale?: string; options?: Intl.DateTimeFormatOptions };
}

/**
 * Generic date input component
 * @see https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=4%3A127&t=B2Y3PtJHH22XDPkx-0
 */
const DateInput = forwardRef<TouchableOpacityRef, DateInputProps>(
  (
    {
      value,
      defaultPickerDate,
      label,
      pickerTitle,
      pickerConfirmLabel,
      pickerCancelLabel,
      onChange,
      error,
      maximumDate,
      minimumDate,
      formatDateOptions,
      ...props
    },
    ref,
  ) => {
    const t = useAccessibilityTranslation();
    const colorScheme = useAppColorScheme();
    const valueStr = useMemo(
      () => (value ? formatDate(value, formatDateOptions?.locale, formatDateOptions?.options) : undefined),
      [value, formatDateOptions],
    );

    const [forwardedRef, refObject] = useForwardedRef(ref);
    const [pickerOpen, setPickerOpen] = useState(false);

    const onOpen = useCallback(() => setPickerOpen(true), []);
    const onConfirm = useCallback(
      (date) => {
        setPickerOpen(false);
        if (!onChange?.(date as Date)) {
          setTimeout(() => focusAccessibility(refObject.current), 200);
        }
      },
      [onChange, refObject],
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
        accessibilityValue={{ text: valueStr }}
        accessibilityHint={t('accessibility.control.combobox.tapToSelect')}
        onPress={onOpen}
        {...props}>
        <Input
          pointerEvents="none"
          label={label}
          error={error}
          value={valueStr}
          disabled={true}
          accessory={InputAccessory.Dropdown}
        />
        <DatePicker
          modal
          mode="date"
          textColor={colorScheme.text}
          open={pickerOpen}
          date={value ?? defaultPickerDate ?? new Date()}
          title={pickerTitle ?? label}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          confirmText={pickerConfirmLabel}
          cancelText={pickerCancelLabel}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      </TouchableOpacity>
    );
  },
);

DateInput.displayName = 'DateInput';
export default DateInput;
