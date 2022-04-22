import { IonCardSubtitle, IonCol, IonInput, IonItem } from "@ionic/react";
import styles from "./index.module.scss";

export const PollDuration = ({ label, value, setter }) => (
  <IonCol size="4">
    <IonItem lines="full" className={styles.pollDuration}>
      <IonCol className="ion-text-center">
        <IonCardSubtitle>{label}</IonCardSubtitle>
        <IonInput
          type="number"
          inputmode="numeric"
          value={value}
          onIonChange={(e) => setter(e.target.value)}
        />
      </IonCol>
    </IonItem>
  </IonCol>
);
