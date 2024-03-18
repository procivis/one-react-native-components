import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import ActivityIndicator from './activity-indicator';

const Basic: ComponentStory<typeof ActivityIndicator> = (args) => <ActivityIndicator {...args} />;

Basic.args = {};

export { Basic as ActivityIndicator };

export default {
  title: 'view/loading/Activity Indicator',
  component: ActivityIndicator,
} as ComponentMeta<typeof ActivityIndicator>;
