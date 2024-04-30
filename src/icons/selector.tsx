import React, { FC } from 'react';
import Svg, { Path, Rect, SvgProps } from 'react-native-svg';

import { SelectorStatus } from '../credential/selector';
import { useAppColorScheme } from '../theme/color-scheme-context';

interface SelectorIconProps {
  status: SelectorStatus.SelectedCheckmark | SelectorStatus.Rejected | SelectorStatus.Required;
}

export const SelectorIcon: FC<SelectorIconProps> = ({ status }) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      {status === SelectorStatus.Rejected ? (
        <Path
          d="M12.807 12.0012L16.6097 8.18723C16.6645 8.13574 16.6957 8.06384 16.6957 7.98859C16.6957 7.91334 16.6645 7.84144 16.6097 7.78994L16.2124 7.3813C16.0998 7.27882 15.9277 7.27882 15.8151 7.3813L12.0011 11.1953L8.18714 7.3813C8.07454 7.27882 7.90246 7.27882 7.78985 7.3813L7.38121 7.78994C7.27873 7.90255 7.27873 8.07463 7.38121 8.18723L11.1952 12.0012L7.38121 15.8152C7.27873 15.9278 7.27873 16.0999 7.38121 16.2125L7.78985 16.6098C7.84135 16.6646 7.91325 16.6957 7.9885 16.6957C8.06375 16.6957 8.13564 16.6646 8.18714 16.6098L12.0011 12.8071L15.8151 16.6098C15.8666 16.6646 15.9385 16.6957 16.0137 16.6957C16.089 16.6957 16.1609 16.6646 16.2124 16.6098L16.6097 16.2125C16.6645 16.161 16.6957 16.0891 16.6957 16.0138C16.6957 15.9386 16.6645 15.8667 16.6097 15.8152L12.807 12.0012Z"
          fill={colorScheme.error}
        />
      ) : (
        <Path
          d="M16.767 8.11a.432.432 0 0 0-.576 0l-6.013 5.941-3.109-3.149-.001-.001a.411.411 0 0 0-.576 0l-.375.364-.007.008a.432.432 0 0 0 0 .576l4.065 4.098 6.963-6.878.005-.005a.421.421 0 0 0 0-.568l-.368-.38-.008-.006Z"
          fill={status === SelectorStatus.SelectedCheckmark ? colorScheme.accentText : colorScheme.text}
        />
      )}
    </Svg>
  );
};

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=433-28355&mode=design&t=1iRzM15ip3buTTYX-4
export const CheckedIcon: FC<SvgProps> = (props) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Rect width="24" height="24" rx="12" fill={colorScheme.accent} />
      <Path
        d="M16.767 8.10994C16.6031 7.96335 16.3553 7.96335 16.1914 8.10994L10.1779 14.0513L7.06945 10.9024L7.06769 10.9007C6.908 10.7442 6.65225 10.7443 6.49247 10.9007L6.117 11.2652L6.11001 11.273C5.96343 11.4369 5.96328 11.6849 6.10986 11.8488L10.1755 15.9467L17.1378 9.06948L17.1432 9.06357C17.2895 8.90283 17.2895 8.65712 17.1432 8.49638L16.7748 8.11693L16.767 8.10994Z"
        fill={colorScheme.white}
      />
    </Svg>
  );
};
