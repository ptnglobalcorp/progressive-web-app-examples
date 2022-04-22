import { axi } from "@core/networking";
import { configure, makeAutoObservable, runInAction, toJS } from "mobx";
import { createContext, useContext } from "react";

configure({ enforceActions: "always" });

class SignInStore {
  private _userInfo?: any = undefined;
  constructor() {
    makeAutoObservable(this);
  }

  get userInfo() {
    return toJS(this._userInfo);
  }
  setUserInfo = (userInfo?: any) => {
    runInAction(() => {
      this._userInfo = userInfo;
    });
  };

  //Action
  resetStore = () => {
    runInAction(() => {
      this._userInfo = undefined;
    });
  };

  loadSignIn = async (name: string, password: string) => {
    try {
      const data: any = await axi.post(`/_session`, { name, password });
      if (data?.ok) {
        const userInfo = await axi.get(`/_users/org.couchdb.user:${name}`);
        console.log(`userInfo:`, userInfo);
        this.setUserInfo(userInfo);
        localStorage.setItem("_userInfo", JSON.stringify(userInfo));
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

const signInStoreContext = createContext(new SignInStore());
export const useSignInStore = () => {
  return useContext(signInStoreContext);
};
