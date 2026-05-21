export const getTranslatedLabel = (
  translations: Record<string, string> | undefined,
  language: string | undefined,
  defaultLanguage: string,
) => {
  if (!language) {
    return undefined;
  }
  return translations?.[language] ?? translations?.[defaultLanguage];
};
