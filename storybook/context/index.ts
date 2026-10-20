import type { StoryContext, StrictArgs } from '@storybook/react';

export type StorybookViewport = {
  name: string;
  styles: {
    height: string;
    width: string;
  };
};

export type Viewports = {
  [name: string]: StorybookViewport;
};

export type ExtendedContext<TArgs = StrictArgs> = StoryContext<TArgs> & {
  globals: {
    colorScheme: string;
  };
  initialGlobals: {
    viewport: {
      value: string;
    };
  };
  parameters: {
    viewport: {
      options: Viewports;
    };
  };
  userGlobals: {
    viewport: {
      value: string;
    };
  };
};
