import { AccessibilityLanguageFile, defaultLanguageFiles, SupportedAccessibilityLanguage } from './locale';

it('language files consistency', () => {
  const mainFile: AccessibilityLanguageFile = defaultLanguageFiles.en;
  const getNumberOfEntries = (file: AccessibilityLanguageFile) => Object.keys(file).length;

  Object.keys(defaultLanguageFiles).forEach((lang) => {
    const checkedFile: AccessibilityLanguageFile = defaultLanguageFiles[lang as SupportedAccessibilityLanguage];

    expect(getNumberOfEntries(checkedFile)).toBe(getNumberOfEntries(mainFile));

    Object.keys(checkedFile).forEach((entryKey) => {
      expect(Object.keys(mainFile)).toContain(entryKey);
    });
  });
});
