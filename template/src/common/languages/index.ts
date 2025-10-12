import { i18n, setLocale } from "@teek/languages";
import { LanguageEnum } from "@/common/config";
import { localStorageProxy } from "@/common/utils";
import zhCN from "./locales/zh-CN";
import enUS from "./locales/en-US";

export * from "@teek/languages";

// 动态注册语言文件
const messages: Record<string, Recordable> = {
  [LanguageEnum.ZhCn]: zhCN,
  [LanguageEnum.EnUs]: enUS,
};

/**
 * 获取默认语言
 */
const setDefaultLocale = () => {
  const layoutStore = localStorageProxy.getItem("layoutStore");
  const lang = layoutStore?.language;

  if (lang) document.documentElement.lang = lang;
  setLocale(lang);
};

/**
 * 加载项目本身的语言文件
 */
export const loadLocaleMessage = () => {
  Object.entries(messages).forEach(([lang, message]) => {
    // 语言包已经存在，则合并语言包，否则创建语言包
    if (i18n.global.availableLocales.includes(lang)) i18n.global.mergeLocaleMessage(lang, message);
    else i18n.global.setLocaleMessage(lang, message);
  });
};

// 异步（远程）加载语言文件
export const loadLanguageAsync = async (lang: LanguageEnum | `${LanguageEnum}`) => {
  if (!messages[lang]) {
    const ms = await import(`./locales/${lang}.ts`);
    messages[lang] = ms.default;
  }
  i18n.global.setLocaleMessage(lang, messages[lang]);
};

setDefaultLocale();
loadLocaleMessage();

export default i18n;
