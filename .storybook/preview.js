import ColorSchemes from '../storybook/colorScheme';
import { withCommonLibs, FullScreen, withColorScheme } from '../storybook/decorator';
import { withDesign } from 'storybook-addon-designs';

export const decorators = [FullScreen, withCommonLibs, withColorScheme, withDesign];

const viewports = {
  iPhoneX: {
    name: 'iPhone X',
    styles: {
      width: '375px',
      height: '812px',
    },
  },
  iPhoneSE: {
    name: 'iPhone SE',
    styles: {
      width: '320px',
      height: '568px',
    },
  },
  iPhone13Pro: {
    name: 'iPhone 13 Pro',
    styles: {
      width: '428px',
      height: '926px',
    },
  },
  GalaxyS8: {
    name: 'Samsung Galaxy S8',
    styles: {
      width: '360px',
      height: '740px',
    },
  },
  iPadPro11Landscape: {
    name: 'iPad Pro 11" (landscape)',
    styles: {
      width: '1024px',
      height: '756px',
    },
  },
  iPadPro11Portrait: {
    name: 'iPad Pro 11" (portrait)',
    styles: {
      width: '756px',
      height: '1024px',
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'none',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'white',
    values: Object.entries(ColorSchemes.procivisLight)
      .filter(([_, value]) => typeof value === 'string')
      .map(([name, value]) => ({ name, value })),
    grid: {
      cellSize: 8,
      cellAmount: 3,
      opacity: 0.15,
    },
  },
  viewport: {
    defaultViewport: 'iPhoneX',
    viewports,
  },
};

export const globalTypes = {
  colorScheme: {
    name: 'Color Scheme',
    defaultValue: 'procivisLight',
    toolbar: {
      icon: 'eye',
      items: Object.keys(ColorSchemes),
      showName: true,
    },
  },
};
