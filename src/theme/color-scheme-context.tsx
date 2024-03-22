import React, { PropsWithChildren } from 'react';

import type { ColorScheme } from './color-scheme';

const defaultColorScheme: ColorScheme = {
  accent: '#0F151A',
  accentText: '#EBF2F4',
  text: '#0D0E10',
  background: '#F1F3F5',
  black: '#000000',
  white: '#FFFFFF',
  linkText: '#3F7BA6',
  backgroundScroll: 'rgba(241, 243, 245, 0.7)',
  greyDark: '#CDD4DA',
  credentialHeaderBackground: 'rgba(255, 255, 255, 0.87)',
  codeAccent: '#CFD2E7',
  success: '#00D066',
  error: '#D90D0D',
  warning: '#F7BF0B',
};

const ColorSchemeContext = React.createContext<ColorScheme>(defaultColorScheme);
ColorSchemeContext.displayName = 'ColorSchemeContext';

export function ColorSchemeProvider<Scheme extends ColorScheme = ColorScheme>(
  props: PropsWithChildren<{ colorScheme: Scheme }>,
) {
  return <ColorSchemeContext.Provider value={props.colorScheme}>{props.children}</ColorSchemeContext.Provider>;
}

/**
 * A hook to gain access to the current `ColorScheme`
 * @note A custom superset of `ColorScheme` can be used (must also be passed to the `ColorSchemeProvider`)
 */
export function useAppColorScheme<Scheme extends ColorScheme = ColorScheme>(): Readonly<Scheme> {
  return React.useContext(ColorSchemeContext) as Scheme;
}
