import { useGlobalStore } from "@core/store/useGlobalStore";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import styles from "./index.module.scss";

const Home = (props: any) => {
  // const router = useIonRouter();
  const { loadData, data, dataTotal } = useGlobalStore();

  useEffect(() => {
    if (!localStorage.getItem("_userInfo")) {
      // router.push("/start/sign-in");
      props.history.replace("/start/sign-in");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const logout = () => {
    localStorage.removeItem("_userInfo");
    props.history.replace("/start/sign-in");
  };

  return (
    <IonPage className={styles.page}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start" onClick={() => logout()}>
            Sign out
          </IonButtons>
          <IonButtons slot="end">{dataTotal} polls</IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className={styles.content}>
          <IonGrid className="ion-padding">
            <div className={styles.card}>
              {data?.map((poll: any, i: number) => {
                return (
                  <IonCard
                    key={i}
                    className={`animate__animated animate__fadeIn`}
                  >
                    <IonRow className="ion-align-items-center">
                      <IonCol size="9">
                        <IonCardHeader>
                          <IonCardTitle>{poll.doc.question}</IonCardTitle>
                          <IonCardSubtitle>
                            {poll.doc.timeLeft} left
                          </IonCardSubtitle>
                          <p>{poll.doc.totalVotes} votes already</p>
                          <p>You have voted on this poll</p>
                        </IonCardHeader>
                      </IonCol>
                      <IonCol size="3">
                        <IonButton
                          routerLink={`/vote/${poll.doc._id}`}
                          routerDirection="forward"
                        >
                          Vote
                          <IonIcon />
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonCard>
                );
              })}
            </div>
          </IonGrid>
        </div>
      </IonContent>
      <IonFooter>
        <IonRow className="ion-padding-start ion-padding-end">
          <IonCol size="12">
            <IonButton expand="block" routerLink="/add-poll">
              Add new poll
            </IonButton>
          </IonCol>
        </IonRow>
      </IonFooter>
    </IonPage>
  );
};
export default observer(Home);
