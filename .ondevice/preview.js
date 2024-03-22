import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import ColorSchemes from '../storybook/colorScheme';
import { withCommonLibs, withColorScheme } from '../storybook/decorator';

export const decorators = [withBackgrounds, withCommonLibs, withColorScheme];
export const parameters = {
  backgrounds: Object.entries(ColorSchemes.procivis)
    .filter(([_, value]) => typeof value === 'string')
    .map(([name, value]) => ({ name, value, default: name === 'white' })),
};
