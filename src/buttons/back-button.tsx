import React, { FC } from 'react';

import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import { GhostButtonProps } from '../buttons/ghost-button';
import { BackIcon, CloseIcon } from '../icons';
import GhostButton from './ghost-button';

export enum BackButtonIcon {
  Back = 'back',
  Close = 'close',
}

export type BackButtonProps = Omit<GhostButtonProps, 'accessibilityLabel'>;

const BackButton: FC<BackButtonProps> = ({ style, icon = BackButtonIcon.Back, onPress, ...props }) => {
  const t = useAccessibilityTranslation();

  const Icon = icon === BackButtonIcon.Close ? CloseIcon : BackIcon;

  return (
    <GhostButton
      accessibilityLabel={t(icon === BackButtonIcon.Close ? 'accessibility.nav.close' : 'accessibility.nav.back')}
      icon={Icon}
      onPress={onPress}
      style={style}
      {...props}
    />
  );
};

export default BackButton;
