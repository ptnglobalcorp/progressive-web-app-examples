import { IRouteConfig } from "@/core/routes/util/route-dynamic/model";

export const voteRoute: IRouteConfig = {
  path: "vote/:id",
  name: "Vote",
  component: require("./index").default,
};
