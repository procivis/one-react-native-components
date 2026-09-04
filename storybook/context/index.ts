import type { StoryContext, StrictArgs } from '@storybook/react';

export type StorybookViewport = {
  name: string;
  styles: {
      height: string;
    width: string;
  }
};

export type Viewports = {
    [name: string]: StorybookViewport;
}

export type ExtendedContext<TArgs = StrictArgs> = StoryContext<TArgs> & {
    globals: {
      colorScheme: string;
    },
    parameters: {
        viewport: {
          defaultViewport: string;
          options: Viewports;
        }
    },
    userGlobals: {
      viewport: {
        value: string;
      };
    },
}