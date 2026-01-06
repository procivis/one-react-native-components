import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import ColorSchemes from '../storybook/colorScheme';
import { withCommonLibs, withColorScheme } from '../storybook/decorator';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  decorators: [withBackgrounds, withCommonLibs, withColorScheme],
  parameters: {
    backgrounds: Object.entries(ColorSchemes.procivis)
      .filter(([_, value]) => typeof value === 'string')
      .map(([name, value]) => ({ name, value, default: name === 'white' })),
  },
};

export default preview;
