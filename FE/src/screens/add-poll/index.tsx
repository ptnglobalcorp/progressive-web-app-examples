import { useGlobalStore } from "@core/store/useGlobalStore";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTextarea,
  IonToolbar,
  useIonRouter,
  useIonViewDidEnter,
} from "@ionic/react";
import { PollAnswer } from "@screens/add-poll/components/poll-answer";
import { PollDuration } from "@screens/add-poll/components/poll-duration";
import { addOutline, arrowBack } from "ionicons/icons";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
const AddPoll = () => {
  const router = useIonRouter();
  const { loadData, pushData } = useGlobalStore();
  useEffect(() => {
    loadData();
  }, [loadData]);

  useIonViewDidEnter(() => {
    setPollQuestion("");

    setPollDays(0);
    setPollHours(0);
    setPollMins(0);

    setPollAnswers([]);
  });

  /* ====  Poll Question  ==== */
  const [pollQuestion, setPollQuestion] = useState("");
  /* ====  / Poll Question  ==== */

  /* ====  Poll Duration  ==== */
  const [pollDays, setPollDays] = useState(0);
  const [pollHours, setPollHours] = useState(0);
  const [pollMins, setPollMins] = useState(0);
  /* ====  / Poll Duration  ==== */

  /* ====  Poll Answers  ==== */
  const [pollAnswers, setPollAnswers] = useState<any>([]);

  const handleAddAnswer = () => {
    const answer = {
      _id: new Date().toISOString(),
      answer: "",
      votes: 0,
      percent: 0,
      voters: [],
    };
    setPollAnswers((prev: any) => [...prev, answer]);
  };

  const handleChangeAnswer = (e: any, index: number) => {
    const newAnswers = [...pollAnswers];
    newAnswers[index].answer = e.target.value;
    setPollAnswers(newAnswers);
  };

  const handleRemoveAnswer = (answer: any) => {
    const newAnswers = pollAnswers.filter((p: any) => p !== answer);
    setPollAnswers(newAnswers);
  };
  /* ====  / Poll Answers  ==== */

  /* ====  Handle Save New Poll  ==== */
  const handleSaveNewPoll = async () => {
    const timeLeftDays = pollDays !== 0 ? `${pollDays} days, ` : "";
    const timeLeftHours = pollHours !== 0 ? `${pollHours} hours, ` : "";
    const timeLeftMins = pollMins !== 0 ? `${pollMins} mins` : "";

    const timeLeft = `${timeLeftDays}${timeLeftHours}${timeLeftMins}`;

    const poll = {
      _id:
        new Date().getUTCMilliseconds() +
        Math.random().toString(36).substr(2, 9) +
        new Date().getUTCMilliseconds(),
      question: pollQuestion,
      timeLeft,
      answers: pollAnswers,
      totalVotes: 0,
      voted: false,
    };
    pushData(poll);
    router.push("/home");
  };
  /* ====  / Handle Save New Poll  ==== */

  return (
    <IonPage className={styles.page}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={arrowBack} text="Back" />
          </IonButtons>
          <IonButtons slot="end">Add Poll</IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className={styles.content}>
          <IonGrid className="ion-padding">
            <IonRow>
              <IonCol size="12">
                <IonItem lines="full" className={styles.pollQuestion}>
                  <IonLabel position="floating">Poll Question</IonLabel>
                  <IonTextarea
                    rows={2}
                    value={pollQuestion}
                    onIonChange={(e: any) => setPollQuestion(e.target.value)}
                    placeholder="A question to ask..."
                  />
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow className="ion-margin-top">
              <IonCol size="12" className="ion-padding-start">
                <IonCardTitle>Poll Duration</IonCardTitle>
              </IonCol>

              <IonCol size="12">
                <IonRow className="ion-justify-content-center ion-align-items-center ion-text-center">
                  <PollDuration
                    label="Days"
                    value={pollDays}
                    setter={setPollDays}
                  />
                  <PollDuration
                    label="Hours"
                    value={pollHours}
                    setter={setPollHours}
                  />
                  <PollDuration
                    label="Mins"
                    value={pollMins}
                    setter={setPollMins}
                  />
                </IonRow>
              </IonCol>
            </IonRow>

            <IonRow className="ion-margin-top ion-align-items-center">
              <IonCol size="10" className="ion-padding-start">
                <IonCardTitle className="ion-justify-content-between">
                  Poll Answers
                </IonCardTitle>
              </IonCol>

              <IonCol size="2">
                <IonButton onClick={handleAddAnswer}>
                  <IonIcon icon={addOutline} />
                </IonButton>
              </IonCol>
            </IonRow>

            {pollAnswers.length > 0 &&
              pollAnswers.map((answer: any, index: number) => {
                return (
                  <PollAnswer
                    key={`pollAnswer_${index}`}
                    index={index}
                    value={answer}
                    remove={handleRemoveAnswer}
                    change={handleChangeAnswer}
                  />
                );
              })}
          </IonGrid>
        </div>
      </IonContent>
      <IonFooter>
        <IonRow className="ion-padding-start ion-padding-end">
          <IonCol size="12">
            <IonButton expand="block" onClick={handleSaveNewPoll}>
              Save new poll
            </IonButton>
          </IonCol>
        </IonRow>
      </IonFooter>
    </IonPage>
  );
};
export default observer(AddPoll);
