import type { I18nOptions } from "vue-i18n";
import { createI18n } from "vue-i18n";
import { LanguageEnum } from "@teek/config";
import { isObject } from "@teek/utils";
import zhCN from "./locales/zh-CN";
import enUS from "./locales/en-US";

// 动态注册语言文件
const messages = {
  [LanguageEnum.ZhCn]: zhCN,
  [LanguageEnum.EnUs]: enUS,
} as I18nOptions["messages"];

// 多语言选项
export const languageOptions = [
  { value: LanguageEnum.ZhCn, label: "简体中文" },
  { value: LanguageEnum.EnUs, label: "English" },
];

/**
 * 获取默认语言
 */
export const getDefaultLocale = () => {
  const lang = getBrowserLang();

  document.documentElement.lang = lang;
  return lang;
};

/**
 * 获取浏览器默认语言
 */
export const getBrowserLang = (): string => {
  const browserLang = navigator.language ? navigator.language : (navigator as any).browserLanguage;
  if (["cn", "zh", "zh-cn"].includes(browserLang.toLowerCase())) return LanguageEnum.ZhCn;
  else return LanguageEnum.EnUs;
};

/**
 * 自定义的国际化转换函数，等价于 vue-i18n 的 $t 或 t
 * 在其他 .ts 文件使用国际化，则使用该函数转换，因为 useI18n 必须在 setup 中使用
 */
export const t = (message: string | Record<string, string>, option?: Record<string, string | number>) => {
  if (!message) return "";

  // message 为 { zh: "", en: "" } 时，直接返回对于语言的值
  if (isObject(message)) {
    const locale = i18n.global.locale;
    return formatTranslate(message[locale.value], option);
  }

  // 使用 te() 方法检查翻译键值是否存在，避免控制台警告
  if (i18n.global.te(message)) return formatTranslate(i18n.global.t(message), option);
  // 如果翻译键值不存在，则返回 message 的最后一个单词
  return message.split(".").pop() || message;
};

/**
 * 格式化翻译内容
 */
const formatTranslate = (message: string, option?: Record<string, string | number>) => {
  if (!option) return message;

  return message.replace(/\{(\w+)\}/g, (_, key) => `${option?.[key] ?? `{${key}}`}`);
};

/**
 * 国际化实例
 */
export const i18n = createI18n({
  legacy: false, // 如果要支持 compositionAPI，此项必须设置为 false
  locale: getDefaultLocale(), // 设置语言类型
  globalInjection: true, // 全局注册 $t 方法
  messages,
  fallbackLocale: LanguageEnum.ZhCn,
});

export const setLocale = (locale: LanguageEnum | `${LanguageEnum}`) => {
  i18n.global.locale.value = locale;
};

export const $t = i18n.global.t;
export const $te = i18n.global.te;

export default i18n;
