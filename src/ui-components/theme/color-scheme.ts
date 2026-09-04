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
  darkMode: boolean;
  error: string;
  errorText: string;
  grayDark: string;
  linkText: string;
  nerdView: {
    attributeLabel: string;
    attributeSectionBackground: string;
    attributeValueBackground: string;
    attributeValueBorder: string;
    background: string;
    button: string;
    codeHighlightText: string;
  };
  success: string;
  successText: string;
  text: string;
  warning: string;
  white: string;
}
