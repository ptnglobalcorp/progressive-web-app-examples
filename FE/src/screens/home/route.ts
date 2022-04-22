import { IRouteConfig } from "@/core/routes/util/route-dynamic/model";

export const homeRoute: IRouteConfig = {
  path: "home",
  name: "Home",
  component: require("./index").default,
};
