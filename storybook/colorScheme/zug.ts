import type { ColorScheme } from '../../src/theme';

export const light: ColorScheme = {
  text: '#141414',
  textSecondary: '#3B5574',
  accent: '#000000',
  accentSecondary: '#31A2DE',
  accentText: '#FFFFFF',
  accentTextSecondary: 'rgba(255, 255, 255, 0.8)',
  background: '#F1F3F5',
  glow: 'rgba(255, 255, 255, 0.2)',
  shadow: {
    shadowColor: '#000000',
    shadowOpacity: 0.05,
  },
  overlay: 'rgba(0, 0, 0, 0.8)',
  alert: '#FFF1F0',
  alertText: '#FF2424',
  success: '#F6FFED',
  successText: '#00D066',
  notice: '#FFFBE6',
  noticeText: '#3E360C',
  black: '#000000',
  white: '#FFFFFF',
  lightGrey: '#5A6779',
  lighterGrey: '#CDD4DA',
  lineargradient: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)'],
  linkText: '#3664A9',
};
