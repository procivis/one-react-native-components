import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useCallback, useState } from 'react';

import { Button } from '../buttons';
import LanguageSelector from './LanguageSelector';

const Basic: ComponentStory<typeof LanguageSelector> = ({ visible: initiallyVisible, onClose, ...args }) => {
  const [visible, setVisible] = useState(initiallyVisible);
  const handleClose = useCallback(
    (selectedLanguage: string) => {
      onClose(selectedLanguage);
      setVisible(false);
    },
    [onClose],
  );
  return (
    <>
      <Button onPress={() => setVisible(true)}>Show modal</Button>
      <LanguageSelector visible={visible} onClose={handleClose} {...args} />
    </>
  );
};
Basic.args = {
  visible: false,
  initialLanguage: 'en',
  labels: {
    modalTitle: 'Language preference',
    modalDescription: 'Please select below the language of your app. You can change this later.',
    confirmButtonTitle: 'Confirm',
  },
  options: [
    { key: 'en', label: 'English' },
    { key: 'de', label: 'German' },
  ],
};

export { Basic as LanguageSelector };

export default {
  title: 'feature/Language Selector',
  component: LanguageSelector,
  argTypes: {
    onClose: { action: 'onClose' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/baolhE7fB2BMdCN5RVjusX/App-Feature-Library?node-id=2580-60319&t=CXBAuaOL8jNhDJDU-0',
    },
  },
} as ComponentMeta<typeof LanguageSelector>;
