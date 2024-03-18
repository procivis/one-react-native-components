/**
 * Color flavour of the application
 * colors according to figma design: https://www.figma.com/file/fZ4EykovRrgzf1xx71nXfq/Procivis-SSI%2B-%E2%80%93-Color-Concept?node-id=18%3A8303
 */
export interface ColorScheme {
  text: string;
  textSecondary: string;
  accent: string;
  accentSecondary: string;
  accentText: string;
  accentTextSecondary: string;
  background: string;
  glow: string;
  shadow: Readonly<{
    shadowColor: string;
    shadowOpacity: number;
  }>;
  overlay: string;
  alert: string;
  alertText: string;
  success: string;
  successText: string;
  notice: string;
  noticeText: string;
  black: string;
  white: string;
  lightGrey: string;
  lighterGrey: string;
  lineargradient: readonly [string, string];
  linkText: string;
}
