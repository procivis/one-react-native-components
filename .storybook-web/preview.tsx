import type { Parameters, Preview } from '@storybook/react';
import ColorSchemes from '../storybook/colorScheme';
import { withCommonLibs, FullScreen, withColorScheme } from '../storybook/decorator';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import { GlobalTypes } from 'storybook/internal/csf';

const decorators = [FullScreen, withCommonLibs, withColorScheme];

type StorybookViewport = {
  name: string;
  styles: {
    width: string;
    height: string;
  }
};

const viewports = {
  ...INITIAL_VIEWPORTS,
  iPhoneX: {
    name: 'iPhone X',
    styles: {
      width: '375px',
      height: '812px',
    },
  } satisfies StorybookViewport,
  iPhoneSE: {
    name: 'iPhone SE',
    styles: {
      width: '320px',
      height: '568px',
    },
  } satisfies StorybookViewport,
  iPhone13Pro: {
    name: 'iPhone 13 Pro',
    styles: {
      width: '428px',
      height: '926px',
    },
  } satisfies StorybookViewport,
  GalaxyS8: {
    name: 'Samsung Galaxy S8',
    styles: {
      width: '360px',
      height: '740px',
    },
  } satisfies StorybookViewport,
  iPadPro11Landscape: {
    name: 'iPad Pro 11" (landscape)',
    styles: {
      width: '1024px',
      height: '756px',
    },
  } satisfies StorybookViewport,
  iPadPro11Portrait: {
    name: 'iPad Pro 11" (portrait)',
    styles: {
      width: '756px',
      height: '1024px',
    },
  } satisfies StorybookViewport,
};

export type StoryContextParameters = {
  viewport: {
    options: typeof viewports;
  }
}

const parameters: Parameters & StoryContextParameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'none',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  reactOptions: {
    legacyRootApi: false,
    strictMode: false,
  },
  backgrounds: {
    default: 'white',
    values: Object.entries(ColorSchemes.procivis)
      .filter(([_, value]) => typeof value === 'string')
      .map(([name, value]) => ({ name, value })),
    grid: {
      cellSize: 8,
      cellAmount: 3,
      opacity: 0.15,
    },
  },
  viewport: {
    options: viewports,
  },
};

const globalTypes = {
  colorScheme: {
    name: 'Color Scheme',
    defaultValue: 'procivis',
    toolbar: {
      icon: 'eye' as NonNullable<GlobalTypes['colorScheme']['toolbar']>['icon'],
      items: Object.keys(ColorSchemes),
      showName: true,
    },
  },
};

const preview: Preview = {
  decorators,
  parameters,
  globalTypes,
  initialGlobals: {
    viewport: { value: 'iphoneX' },
  },
};

export default preview;
