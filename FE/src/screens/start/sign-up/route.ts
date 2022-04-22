import { IRouteConfig } from "@/core/routes/util/route-dynamic/model";

export const signUpRoute: IRouteConfig = {
  path: "sign-up",
  name: "signUp",
  component: require("./index").default,
};
