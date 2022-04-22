import DefaultLayout from "@/core/layouts/default";
import { routeDynamic } from "@/core/routes/util/route-dynamic";
import { IRouteDynamic } from "@/core/routes/util/route-dynamic/model";
import { RouteLayout } from "@/core/routes/util/route-layout";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { screensRoute } from "@screens/route";
import React from "react";
import { Redirect } from "react-router-dom";

export const AppRoutes: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Redirect exact from="/" to="/start/intro" />
          {screensRoute.children &&
            routeDynamic(screensRoute.children).map(
              (route: IRouteDynamic, index: number): JSX.Element => {
                return (
                  route.component && (
                    <RouteLayout
                      exact
                      key={index}
                      path={`/${route.path}`}
                      component={route.component}
                      layout={route.layout || DefaultLayout}
                    />
                  )
                );
              }
            )}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};
