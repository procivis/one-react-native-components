import type { ComponentMeta, Story } from '@storybook/react';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Placeholder } from '../../storybook/placeholder';
import type { ImageOrComponentSource } from '../image';
import Accordion, { AccordionProps } from './accordion';

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  icon: {
    height: 48,
    width: 48,
  },
  placeholder: {
    marginTop: 12,
    minHeight: 46,
  },
  surround: {
    minHeight: 40,
  },
});

const iconPlaceholder: ImageOrComponentSource = {
  component: <Placeholder id="Icon" style={styles.icon} />,
};

const Basic: Story<AccordionProps> = ({ headerNotice, ...args }) => {
  return (
    <View style={styles.container}>
      <Placeholder id="Above" style={styles.surround} />
      <Accordion
        icon={iconPlaceholder}
        {...args}
        headerNotice={headerNotice ? <Placeholder id="headerNotice" style={styles.placeholder} /> : null}>
        <Placeholder style={styles.placeholder} />
        <Placeholder style={styles.placeholder} />
        <Placeholder style={styles.placeholder} />
      </Accordion>
      <Placeholder id="Below" style={styles.surround} />
    </View>
  );
};

Basic.args = {
  title: 'Title',
  subtitle: 'Subtitle',
  initiallyExpanded: true,
  headerNotice: false,
};

export { Basic as Accordion };

export default {
  title: 'base/Accordion',
  component: Accordion,
  argTypes: {
    onChange: { action: 'onChange' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?type=design&node-id=28-1129&t=eVhals9hIreZTaB1-4',
    },
  },
} as ComponentMeta<typeof Accordion>;
