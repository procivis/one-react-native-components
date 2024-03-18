import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import FileInput from './file-input';

const Basic: ComponentStory<typeof FileInput> = ({ files = [], ...args }) => {
  const [selectedFiles, setSelectedFiles] = useState(files);
  return (
    <FileInput
      {...args}
      files={selectedFiles}
      onAddPress={() => setSelectedFiles([{ name: 'SampleSampleSampleSampleSampleSampleSampleSample' }])}
      onDeletePress={() => setSelectedFiles([])}
    />
  );
};

Basic.args = {
  files: [],
  label: 'Label',
  disabled: false,
  style: { margin: 24 },
};

export { Basic as FileInput };

export default {
  title: 'base/input/File Input',
  component: FileInput,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=1010-10139&t=WXQdtgcyBKjCDkiV-4',
    },
  },
} as ComponentMeta<typeof FileInput>;
