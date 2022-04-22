import { IRouteConfig } from "@/core/routes/util/route-dynamic/model";

export const signInRoute: IRouteConfig = {
  path: "sign-in",
  name: "signIn",
  component: require("./index").default,
};
