import React, { FunctionComponent, useMemo } from 'react';

import { getInitials } from '../utils/string';
import AvatarPlaceholder from './avatar-placeholder';

export interface TextAvatarProps {
  text: string;
  produceInitials: boolean;

  innerSize?: number;
  shape?: 'circle' | 'rect';
  pressed?: boolean;
}

const TextAvatar: FunctionComponent<TextAvatarProps> = ({
  text,
  produceInitials,
  innerSize = 40,
  shape = 'circle',
  pressed,
}) => {
  const content = useMemo(() => (produceInitials ? getInitials(text) : text), [produceInitials, text]);
  return <AvatarPlaceholder shape={shape} innerSize={innerSize} innerText={content} pressed={pressed} />;
};

export default TextAvatar;
