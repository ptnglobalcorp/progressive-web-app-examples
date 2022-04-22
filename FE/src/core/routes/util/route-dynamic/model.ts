import { ReactElement } from "react";

export interface IRouteConfig {
  path: string;
  component?: ReactElement;
  name?: string;
  children?: Array<IRouteConfig>;
  layout?: string;
}
export interface IRouteDynamic {
  path: string;
  component: ReactElement;
  layout?: string;
}
