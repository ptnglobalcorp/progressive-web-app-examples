import { IRouteLayoutProps } from "@/core/routes/util/route-layout/model";
import { Route } from "react-router-dom";

export const RouteLayout = (props: IRouteLayoutProps) => {
  const { layout, component, ...options } = props;
  const Layout = layout;
  return (
    <Layout>
      {{ body: <Route {...options} exact={true} component={component} /> }}
    </Layout>
  );
};
