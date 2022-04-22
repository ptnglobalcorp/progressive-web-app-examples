import { GCustomField } from "@common/components/g-custom-field";
import { validateForm } from "@common/utils/validateForm";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { FooterAction } from "@screens/start/components/footer-action";
import { useSignInFields } from "@screens/start/sign-in/hooks/useSignInFields";
import { useSignInStore } from "@screens/start/sign-in/store";
import { arrowBack } from "ionicons/icons";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
const SignIn = (props: any) => {
  // const router = useIonRouter();
  const fields = useSignInFields();
  const [errors, setErrors] = useState(false);
  const { loadSignIn } = useSignInStore();
  const [present] = useIonToast();

  useEffect(() => {
    if (localStorage.getItem("_userInfo")) {
      // router.push("/home");
      props.history.replace("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async () => {
    const errors = validateForm(fields);
    setErrors(errors);
    if (!errors.length) {
      console.log(`fields:`, fields);
      const [name, password] = fields.map(
        (field: any) => field.input.state.value
      );
      const result = await loadSignIn(name, password);
      console.log(`result:`, result);
      if (result) {
        // router.push("/home");
        props.history.replace("/home");
      } else {
        present("The Username or Password is Incorrect", 3000);
      }
    }
  };

  useEffect(() => {
    return () => {
      fields.forEach((field: any) => field.input.state.reset(""));
      setErrors(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <IonPage className={styles.page}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={arrowBack} text="Back" />
          </IonButtons>
          <IonButtons slot="end">Sign in</IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className={styles.content}>
          <IonGrid className="ion-padding">
            <IonRow>
              <IonCol size="12" className={styles.headingText}>
                <h4>Welcome back!</h4>
              </IonCol>
            </IonRow>
            <IonRow className="ion-margin-top ion-padding-top">
              <IonCol size="12">
                {fields.map((field: any, i: number) => {
                  return <GCustomField key={i} field={field} errors={errors} />;
                })}
                <IonButton expand="block" onClick={login}>
                  Login
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
      <IonFooter>
        <IonGrid className="ion-no-margin ion-no-padding">
          <FooterAction
            message="Don't have an account?"
            text="Sign up"
            link="/start/sign-up"
          />
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};
export default observer(SignIn);
