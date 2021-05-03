import { LocalizedTextProps } from 'utils/types/LocalizedText';

export const getLocalizedText = (
  translations: LocalizedTextProps[],
  locale: string,
) => {
  return (
    translations.filter(t => t.language.code === locale.toLowerCase())[0]
      ?.text || (translations.length > 0 ? translations[0].text : '')
  );
};
