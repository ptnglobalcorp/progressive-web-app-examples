import { IonCol, IonRouterLink, IonRow } from "@ionic/react";
import "./index.module.scss";
interface IFooterProps {
  message: string;
  link: string;
  text: string;
}
export const FooterAction = ({ message, link, text }: IFooterProps) => (
  <IonRow className="ion-text-center ion-justify-content-center">
    <IonCol size="12">
      <p>
        {message}
        <IonRouterLink routerLink={link}> {text} &rarr;</IonRouterLink>
      </p>
    </IonCol>
  </IonRow>
);
