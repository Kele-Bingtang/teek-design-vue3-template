import { useInstall } from "@/common/utils";
import index from "./src/index.vue";

export const PointTag = useInstall(index);

export type * from "./src/types";

export default index;
