import React, { PropsWithChildren } from 'react';

import type { ColorScheme } from './color-scheme';

const defaultColorScheme: ColorScheme = {
  accent: '#0F151A',
  accentSecondary: '#FFA0A0',
  accentText: '#EBF2F4',
  background: '#F1F3F5',
  backgroundScroll: 'rgba(241, 243, 245, 0.7)',
  overlay: 'rgba(0, 0, 0, 0.8)',
  black: '#000000',
  codeAccent: '#CFD2E7',
  credentialHeaderBackground: 'rgba(255, 255, 255, 0.87)',
  error: '#D90D0D',
  grayDark: '#CDD4DA',
  linkText: '#3F7BA6',
  success: '#00D066',
  text: '#0D0E10',
  warning: '#F7BF0B',
  white: '#FFFFFF',
  darkMode: false,
  nerdView: {
    background: 'rgba(2, 4, 21, 0.95)',
    attributeLabel: '#929497',
    attributeValueBackground: 'rgba(255, 255, 255, 0.02)',
    attributeValueBorder: 'rgba(255, 255, 255, 0.2)',
    attributeSectionBackground: 'rgba(2, 4, 21, 0.8)',
    button: 'rgba(255, 255, 255, 0.05)',
    codeHighlightText: 'rgba(232, 135, 114, 1)',
  },
  lineargradient: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)'],
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
