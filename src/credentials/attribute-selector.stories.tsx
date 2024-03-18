import type { ComponentMeta, Story } from '@storybook/react';
import React, { useMemo } from 'react';

import { SelectorStatus } from '../buttons/selector';
import AttributeSelector, { AttributeSelectorProps } from './attribute-selector';
import ImageAttributeButton from './image-attribute-button';

const ValueTypes = ['text', 'alert', 'button'] as const;
type Props = AttributeSelectorProps & {
  value: string;
  valueType: (typeof ValueTypes)[number];
};
const Basic: Story<Props> = ({ value, valueType, ...args }) => {
  const v = useMemo(
    () =>
      valueType === 'text'
        ? value
        : valueType === 'alert'
        ? { alert: value }
        : { Component: () => <ImageAttributeButton title={value} /> },
    [value, valueType],
  );
  return <AttributeSelector {...args} value={v} />;
};

Basic.args = {
  status: SelectorStatus.SelectedCheck,
  label: 'Label',
  value: 'Value',
  labelAlert: '(label-alert)',
  valueType: 'text',
};

export { Basic as AttributeSelector };

export default {
  title: 'base/input/Attribute Selector',
  component: AttributeSelector,
  argTypes: {
    status: {
      options: [
        SelectorStatus.Unselected,
        SelectorStatus.SelectedRadio,
        SelectorStatus.SelectedCheck,
        SelectorStatus.LockedSelected,
        SelectorStatus.Disabled,
        SelectorStatus.LockedInvalid,
        SelectorStatus.Invalid,
      ],
      control: { type: 'radio' },
    },
    valueType: {
      options: ValueTypes,
      control: { type: 'radio' },
    },
    onSelected: { action: 'onSelected' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=8%3A13152',
    },
  },
} as ComponentMeta<typeof AttributeSelector>;
