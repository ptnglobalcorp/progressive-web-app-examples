import { IRouteConfig } from "@/core/routes/util/route-dynamic/model";

export const addPollRoute: IRouteConfig = {
  path: "add-poll",
  name: "Add Poll",
  component: require("./index").default,
};
