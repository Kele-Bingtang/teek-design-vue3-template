import components from "./components";
import { installComponents } from "./installer";

export * from "@teek/components";
export * from "@/common/config";
export * from "@teek/directives";
export * from "@teek/hooks";
export * from "@teek/http";
export * from "@teek/utils";

const installer = installComponents([...components]);

export const install = installer.install;
export default installer;
