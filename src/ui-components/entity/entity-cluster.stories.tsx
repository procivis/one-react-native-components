import type { ComponentMeta, Story } from '@storybook/react';
import React from 'react';

import { EntityTrustedIcon } from '../icons/entity';
import EntityCluster, { EntityClusterProps } from './entity-cluster';

type Args = EntityClusterProps & {
  withStatusIcon: boolean;
  withImage: boolean;
};

const Basic: Story<Args> = ({ withStatusIcon, withImage, ...args }) => {
  return (
    <EntityCluster
      {...args}
      avatar={{
        avatar: withImage ? { imageSource: { uri: 'https://i.pravatar.cc/72' } } : undefined,
        statusIcon: withStatusIcon ? EntityTrustedIcon : undefined,
      }}
    />
  );
};

Basic.args = {
  entityName: 'Entity name',
  subline: 'entity detail',
  withStatusIcon: true,
  withImage: true,
};

export { Basic as EntityCluster };

export default {
  title: 'component/entity/EntityCluster',
  component: EntityCluster,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=426-25595&mode=design&t=YI1oD2BfBie5HcvJ-0',
    },
  },
} as ComponentMeta<typeof EntityCluster>;
