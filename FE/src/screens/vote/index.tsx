import { useGlobalStore } from "@core/store/useGlobalStore";
import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonProgressBar,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import { useSignInStore } from "@screens/start/sign-in/store";
import { arrowBack } from "ionicons/icons";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./index.module.scss";

const Vote = () => {
  const { itemActive, setItemActive, updateData, getDataGlobal, data } =
    useGlobalStore();
  const { userInfo } = useSignInStore();
  let userInfoGetStorage = undefined;
  if (localStorage.getItem("_userInfo")) {
    userInfoGetStorage = JSON.parse(
      localStorage.getItem("_userInfo") as string
    );
  }
  const userInfoShow = userInfo || userInfoGetStorage;

  const [selected, setSelected] = useState<string>("");
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getDataGlobal(id).then((data) => {
      setItemActive(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const voter = userInfoShow?.name || "anonymous";
    if (itemActive) {
      itemActive.answers.map((item: any) => {
        item.voters = item.voters.filter((item: any) => {
          return item !== voter;
        });

        if (item.answer === selected) {
          if (!item.voters.includes(voter)) {
            item.voters.push(voter);
          }
        }
        item.votes = item?.voters.length;
        return { ...item };
      });
      setItemActive(itemActive);
      updateData(id, itemActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <IonPage className={styles.page}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={arrowBack} text="Back" />
          </IonButtons>
          <IonButtons slot="end">{userInfoShow?.name}</IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className={styles.content}>
          <IonGrid className="ion-padding">
            <IonRow>
              <IonCol size="12">
                <div className={styles.card}>
                  {itemActive && (
                    <IonList>
                      <IonRadioGroup
                        value={selected}
                        onIonChange={(e) => setSelected(e.detail.value)}
                      >
                        <IonListHeader>
                          <IonLabel>{itemActive.question}</IonLabel>
                        </IonListHeader>
                        {itemActive.answers.map((item: any, index: number) => (
                          <div key={index}>
                            <IonItem lines="none">
                              <IonLabel>{item.answer}</IonLabel>
                              <IonRadio slot="start" value={item.answer} />
                              {item.votes}
                            </IonItem>
                            <IonRow className={styles.progressBar}>
                              <IonCol size="12">
                                <IonProgressBar value={15 / 100} />
                              </IonCol>
                            </IonRow>
                          </div>
                        ))}
                        <IonItemDivider>Your Selection</IonItemDivider>
                      </IonRadioGroup>
                      <IonItem>{selected ?? "(none selected"}</IonItem>
                    </IonList>
                  )}
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
      <IonFooter>
        <IonRow className="ion-padding-start ion-padding-end">
          <IonCol size="12">%%%%</IonCol>
        </IonRow>
      </IonFooter>
    </IonPage>
  );
};
export default observer(Vote);
