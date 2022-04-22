import {
  IRouteConfig,
  IRouteDynamic,
} from "@/core/routes/util/route-dynamic/model";

const recursive = (
  arrChild: IRouteConfig[],
  baseUrl: string,
  actionRoute: IRouteDynamic[]
) => {
  if (arrChild.length > 0) {
    arrChild.forEach((item: IRouteConfig) => {
      const baseUrlTemp = baseUrl ? `${baseUrl}/` : "";
      const path = item.path ? `${baseUrlTemp}${item.path}` : baseUrl;
      if (item.component) {
        actionRoute.push({
          path,
          component: item.component,
        });
      }
      if (item.children) {
        recursive(item.children, path, actionRoute);
      }
    });
  }
};

export const routeDynamic = (arr: IRouteConfig[]): IRouteDynamic[] => {
  return arr.flatMap((item) => {
    const actionRoute: Array<any> = [];
    if (Array.isArray(item.children)) {
      recursive(item.children, item.path, actionRoute);
    } else {
      recursive([item], "", actionRoute);
    }
    return actionRoute;
  });
};
