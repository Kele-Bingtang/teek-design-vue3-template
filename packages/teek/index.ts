import components from "./components";
import { installComponents } from "./installer";

export * from "@teek/components";
export * from "@teek/config";
export * from "@teek/directives";
export * from "@teek/composables";
export * from "@teek/http";
export * from "@teek/utils";

const installer = installComponents([...components]);

export const install = installer.install;
export default installer;
