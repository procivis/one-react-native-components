import de from './de.json';
import en from './en.json';
import fr from './fr.json';
import it from './it.json';

export const defaultLanguageFiles = { en, de, fr, it };

export type SupportedAccessibilityLanguage = keyof typeof defaultLanguageFiles;
export type AccessibilityLanguageFile = typeof en;

export const getAccessibilityLanguageFile = (
  language: SupportedAccessibilityLanguage,
  overrides?: Partial<AccessibilityLanguageFile>,
): AccessibilityLanguageFile =>
  Object.assign<{}, AccessibilityLanguageFile, Partial<AccessibilityLanguageFile> | undefined>(
    {},
    defaultLanguageFiles[language],
    overrides,
  );
