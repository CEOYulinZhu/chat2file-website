import 'server-only';
import type { Locale } from './i18n-config';

const dictionaries = {
    en: () => import('@/dictionaries/en.json').then((module) => module.default),
    zh: () => import('@/dictionaries/zh.json').then((module) => module.default),
    ja: () => import('@/dictionaries/ja.json').then((module) => module.default),
} as const;

export const getDictionary = async (locale: Locale) => {
    const dictionaryImporter = dictionaries[locale];

    if (!dictionaryImporter) {
        // 回退到默认语言
        return dictionaries['zh']();
    }

    return dictionaryImporter();
}; 