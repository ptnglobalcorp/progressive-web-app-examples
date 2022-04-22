import {
  IonButton,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonImg,
  IonPage,
  IonRouterLink,
  IonRow,
} from "@ionic/react";
import { FooterAction } from "@screens/start/components/footer-action";
import styles from "./index.module.scss";

const Intro = () => {
  return (
    <IonPage className={styles.page}>
      <IonHeader>
        <IonImg src="/assets/img/poll.jpg" />
      </IonHeader>
      <IonContent fullscreen>
        <div className={styles.content}>
          <IonGrid>
            <IonRow
              className={`${styles.heading} ion-text-center ion-justify-content-center`}
            >
              <IonCol size="11" className={styles.headingText}>
                <IonCardTitle>FOOD CHOICE</IonCardTitle>
              </IonCol>
            </IonRow>
            <IonRow className={`ion-text-center ion-justify-content-center`}>
              <IonRouterLink
                routerLink="/start/sign-up"
                className="custom-link"
              >
                <IonCol size="11">
                  <IonButton className={`${styles.button} custom-button`}>
                    Get started &rarr;
                  </IonButton>
                </IonCol>
              </IonRouterLink>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>

      <IonFooter>
        <IonGrid className="ion-no-margin ion-no-padding">
          <FooterAction
            message="Already got an account?"
            text="Login"
            link="/start/sign-in"
          />
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default Intro;
