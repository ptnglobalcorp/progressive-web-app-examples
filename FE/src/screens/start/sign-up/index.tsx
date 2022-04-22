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
import { useSignUpFields } from "@screens/start/sign-up/hooks/useSignupFields";
import { useSignUpStore } from "@screens/start/sign-up/store";
import { arrowBack } from "ionicons/icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";

const SignUp = (props: any) => {
  const { create } = useSignUpStore();
  const [present] = useIonToast();
  const fields = useSignUpFields();
  const [errors, setErrors] = useState<any>(false);

  const createAccount = async () => {
    const errors = validateForm(fields);
    setErrors(errors);

    if (!errors.length) {
      const [name, password] = fields.map(
        (field: any) => field.input.state.value
      );
      const result = await create(name, password);
      if (!result) {
        present("Registration failed", 3000);
      } else {
        present("Sign Up Success", 3000);
        setTimeout(() => {
          props.history.replace("/start/sign-in");
        }, 4000);
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
          <IonButtons slot="end">Sign up</IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className={styles.content}>
          <IonGrid className="ion-padding">
            <IonRow className="ion-margin-top ion-padding-top">
              <IonCol size="12">
                {fields.map((field: any, i: number) => {
                  return <GCustomField key={i} field={field} errors={errors} />;
                })}
                <IonButton expand="block" onClick={createAccount}>
                  Create account
                </IonButton>
              </IonCol>
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

export default observer(SignUp);
