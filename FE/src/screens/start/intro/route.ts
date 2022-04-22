import { IRouteConfig } from "@/core/routes/util/route-dynamic/model";

export const introRoute: IRouteConfig = {
  path: "intro",
  name: "Intro",
  component: require("./index").default,
};
