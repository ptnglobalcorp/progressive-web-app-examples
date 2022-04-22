import { axi } from "@core/networking";
import { configure, makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

configure({ enforceActions: "always" });

class SignUpStore {
  constructor() {
    makeAutoObservable(this);
  }

  create = async (
    name: string,
    password: string,
    roles: any = [],
    type: string = "user"
  ) => {
    try {
      const data: any = await axi.put(`/_users/org.couchdb.user:${name}`, {
        name,
        password,
        roles,
        type,
      });
      if (data?.ok) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };
}

const signUpStoreContext = createContext(new SignUpStore());
export const useSignUpStore = () => {
  return useContext(signUpStoreContext);
};
