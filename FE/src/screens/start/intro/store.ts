import { configure, makeAutoObservable, runInAction, toJS } from "mobx";
import { createContext, useContext } from "react";

configure({ enforceActions: "always" });

class HomeStore {
  private _home?: any = "ok đây là store in mobx";
  constructor() {
    makeAutoObservable(this);
  }

  get home() {
    return toJS(this._home);
  }
  setHome = (home?: any) => {
    runInAction(() => {
      this._home = home;
    });
  };

  //Action
  resetStore = () => {
    runInAction(() => {
      this._home = undefined;
    });
  };

  loadHome = async (homeId: number) => {
    // this.setIsLoading(true);
    // const response = await getBuildingRegistersEnquiryById(
    //   homeId
    // );
    // let errorResponse = undefined;
    // let newHome = undefined;
    // if (isSuccessResponse(response)) {
    //   newHome = response.data;
    // } else {
    //   errorResponse = {
    //     status: response.status,
    //     error: response.error,
    //   };
    // }
    // this.setResponseLoadError(errorResponse);
    // this.setHome(newHome);
    // this.setIsLoading(false);
  };
}

const homeStoreContext = createContext(new HomeStore());
export const useHomeStore = () => {
  return useContext(homeStoreContext);
};
