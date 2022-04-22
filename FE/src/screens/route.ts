import { IRouteConfig } from "@core/routes/util/route-dynamic/model";
import { addPollRoute } from "@screens/add-poll/route";
import { homeRoute } from "@screens/home/route";
import { startRoute } from "@screens/start/route";
import { voteRoute } from "@screens/vote/route";

export const screensRoute: IRouteConfig = {
  path: "screens",
  name: "Screens",
  children: [homeRoute, startRoute, addPollRoute, voteRoute],
};
