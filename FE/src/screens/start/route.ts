import { IRouteConfig } from "@/core/routes/util/route-dynamic/model";
import { introRoute } from "@screens/start/intro/route";
import { signInRoute } from "@screens/start/sign-in/route";
import { signUpRoute } from "./sign-up/route";

export const startRoute: IRouteConfig = {
  path: "start",
  name: "Start",
  children: [introRoute, signInRoute, signUpRoute],
};
