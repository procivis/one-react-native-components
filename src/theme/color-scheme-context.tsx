import React, { PropsWithChildren } from 'react';

import type { ColorScheme } from './color-scheme';

const defaultColorScheme: ColorScheme = {
  text: '#141414',
  textSecondary: '#3B5574',
  accent: '#F62323',
  accentSecondary: '#FFA0A0',
  accentText: '#FFFFFF',
  accentTextSecondary: 'rgba(0, 0, 0, 0.8)',
  background: '#F1F3F5',
  glow: 'rgba(255, 255, 255, 0.2)',
  shadow: {
    shadowColor: '#000000',
    shadowOpacity: 0.05,
  },
  overlay: 'rgba(0, 0, 0, 0.8)',
  alert: '#FFF1F0',
  alertText: '#A73535',
  success: '#F6FFED',
  successText: '#00D066',
  notice: '#FFFBE6',
  noticeText: '#3E360C',
  black: '#000000',
  white: '#FFFFFF',
  lightGrey: '#939AA4',
  lighterGrey: '#CDD4DA',
  lineargradient: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)'],
  linkText: '#FF1A1A',
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
