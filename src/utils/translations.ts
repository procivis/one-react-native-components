const primaryLanguageSubtag = (languageTag: string): string =>
  languageTag.toLowerCase().split('-')[0];

const isSameTag = (a: string, b: string): boolean =>
  a.toLowerCase() === b.toLowerCase();

const isSameLanguage = (a: string, b: string): boolean =>
  primaryLanguageSubtag(a) === primaryLanguageSubtag(b);

export const resolveLocalizedValue = (
  translations: Record<string, string> | undefined,
  preferredLanguages: (string | undefined)[],
): string | undefined => {
  const availableLanguages = Object.keys(translations ?? {});

  for (const language of preferredLanguages) {
    if (!language) {
      continue;
    }

    const exactMatch = availableLanguages.find((available) =>
      isSameTag(available, language),
    );
    const sameLanguageMatch = availableLanguages.find((available) =>
      isSameLanguage(available, language),
    );

    const bestMatch = exactMatch ?? sameLanguageMatch;
    if (bestMatch) {
      return translations?.[bestMatch];
    }
  }

  return undefined;
};

export const getTranslatedLabel = (
  translations: Record<string, string> | undefined,
  language: string | undefined,
  defaultLanguage: string,
) => {
  if (!language) {
    return undefined;
  }
  return resolveLocalizedValue(translations, [language, defaultLanguage]);
};
