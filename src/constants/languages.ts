export const languages = [
  { code: "en-US", label: "English",    flag: "🇺🇸", vapiLang: "en" },
  { code: "hi-IN", label: "Hindi",      flag: "🇮🇳", vapiLang: "hi" },
  { code: "es-ES", label: "Spanish",    flag: "🇪🇸", vapiLang: "es" },
  { code: "fr-FR", label: "French",     flag: "🇫🇷", vapiLang: "fr" },
  { code: "de-DE", label: "German",     flag: "🇩🇪", vapiLang: "de" },
  { code: "pt-BR", label: "Portuguese", flag: "🇧🇷", vapiLang: "pt" },
  { code: "ja-JP", label: "Japanese",   flag: "🇯🇵", vapiLang: "ja" },
  { code: "ko-KR", label: "Korean",     flag: "🇰🇷", vapiLang: "ko" },
  { code: "zh-CN", label: "Chinese",    flag: "🇨🇳", vapiLang: "zh" },
  { code: "ar-SA", label: "Arabic",     flag: "🇸🇦", vapiLang: "ar" },
  { code: "ru-RU", label: "Russian",    flag: "🇷🇺", vapiLang: "ru" },
  { code: "it-IT", label: "Italian",    flag: "🇮🇹", vapiLang: "it" },
];

export type Language = (typeof languages)[0];
export const defaultLanguage = languages[0];
