/**
 * Color flavour of the application
 * colors according to figma design: https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=0-1
 */
export interface ColorScheme {
  accent: string;
  accentText: string;
  background: string;
  backgroundScroll: string;
  black: string;
  codeAccent: string;
  credentialHeaderBackground: string;
  error: string;
  errorText: string;
  grayDark: string;
  linkText: string;
  success: string;
  successText: string;
  text: string;
  warning: string;
  white: string;
  darkMode: boolean;
  nerdView: {
    background: string;
    attributeLabel: string;
    attributeSectionBackground: string;
    attributeValueBackground: string;
    attributeValueBorder: string;
    button: string;
    codeHighlightText: string;
  };
}
