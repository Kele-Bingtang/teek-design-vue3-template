import { createPinia } from "pinia";
import { resetSetupStore } from "./plugins";

export * from "./stores/layout";
export * from "./stores/route";
export * from "./stores/setting";
export * from "./stores/user";
export * from "./stores/error-log";

const pinia = createPinia();

pinia.use(resetSetupStore);

export default pinia;

export const resetAllStores = () => {
  if (!pinia) {
    console.error("Pinia is not installed");
    return;
  }

  const allStores = (pinia as any)._s;
  for (const [_key, store] of allStores) {
    store.$reset();
  }
};
