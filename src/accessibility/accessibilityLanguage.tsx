import React, { FunctionComponent, PropsWithChildren, useContext, useMemo } from 'react';

import { AccessibilityLanguageFile, getAccessibilityLanguageFile, SupportedAccessibilityLanguage } from './locale';

export type AccessibilityLanguageFileEntryKey = keyof AccessibilityLanguageFile;
type AccessibilityLanguageTranslate = (
  entryKey: AccessibilityLanguageFileEntryKey,
  params?: Record<string, string | number>,
) => string;

const accessibilityLanguageContext = React.createContext<AccessibilityLanguageTranslate | undefined>(undefined);

export interface AccessibilityLanguageProviderProps {
  language: SupportedAccessibilityLanguage;
  overrides?: Partial<AccessibilityLanguageFile> | AccessibilityLanguageTranslate;
}

const Provider = accessibilityLanguageContext.Provider;

/**
 * Adds app support for accessibility language
 * @param {SupportedAccessibilityLanguage} language Currenty selected language of the app
 * @param {Object} overrides _(optional)_ Custom overrides for specific entries
 */
export const AccessibilityLanguageProvider: FunctionComponent<
  PropsWithChildren<AccessibilityLanguageProviderProps>
> = ({ language, overrides, children }) => {
  const translate = useMemo<AccessibilityLanguageTranslate>(() => {
    if (typeof overrides === 'function') {
      return overrides;
    }

    const accessibilityFile = getAccessibilityLanguageFile(language, overrides);
    return (entryKey, params) => {
      let translation = accessibilityFile[entryKey];

      // replace params
      if (translation && params) {
        Object.entries(params).forEach(([key, value]) => {
          translation = translation.replace(new RegExp(`{${key}}`, 'g'), String(value));
        });
      }

      return translation;
    };
  }, [language, overrides]);

  return <Provider value={translate}>{children}</Provider>;
};

/**
 * Access accessibility language translations
 * @note This needs to be used inside {@link AccessibilityLanguageProvider} context
 */
export const useAccessibilityTranslation = () => {
  const translate = useContext(accessibilityLanguageContext);

  // check context provided
  if (!translate) {
    throw new Error('Accessibility Language not provided!, wrap your components in the AccessibilityLanguageProvider');
  }

  return translate;
};
