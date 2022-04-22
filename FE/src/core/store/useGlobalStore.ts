import { configure, makeAutoObservable, runInAction, toJS } from "mobx";
import { createContext, useContext } from "react";
const PouchDB = require("pouchdb").default;
configure({ enforceActions: "always" });

class GlobalStore {
  private _dbName?: string = "polls";
  private _dbHost?: string = "https://vnptcantho.tk"; // "http://127.0.0.1:5984";
  private _db?: any;
  private _data?: any;
  private _itemActive?: any;
  private _remote?: string = `${this._dbHost}/${this._dbName}`;
  private _isOffLine?: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.setDB(new PouchDB(this._dbName));

    this.syncDB();

    this.db.info((err: any, info: any) => {
      this.db
        .changes({
          since: info.update_seq,
          live: true,
        })
        .on("change", () => {
          // console.log(`Change`);
          this.loadData();
        });
    });

    setInterval(() => {
      // console.log(`navigator.onLine:`, navigator.onLine);
      if (navigator.onLine) {
        if (this.isOffLine) {
          this.syncDB();
          this.setIsOffLine(false);
          // console.log(`Only once`);
        }
      } else {
        this.setIsOffLine(true);
      }
    }, 5000);
  }

  syncDB = () => {
    runInAction(() => {
      const opts = { live: true };
      let sync = this.db.sync(this._remote, opts);

      sync.on("complete", () => {
        sync = this.db.sync(this._remote, opts);
      });
      sync.cancel();
    });
  };

  get isOffLine() {
    return toJS(this._isOffLine);
  }
  setIsOffLine = (isOffLine?: any) => {
    runInAction(() => {
      this._isOffLine = isOffLine;
    });
  };

  get db() {
    return toJS(this._db);
  }
  setDB = (db?: any) => {
    runInAction(() => {
      this._db = db;
    });
  };

  get itemActive() {
    return toJS(this._itemActive);
  }
  setItemActive = (itemActive?: any) => {
    runInAction(() => {
      this._itemActive = itemActive;
    });
  };

  get data() {
    return toJS(this._data?.rows);
  }
  setData = (data?: any) => {
    runInAction(() => {
      this._data.row = data;
      this.syncDB();
    });
  };

  getDataGlobal = async (id?: string) => {
    try {
      const doc = await this.db.get(id);
      return doc;
    } catch (err) {
      console.log(err);
    }
  };
  setDataGlobal = (data?: any) => {
    runInAction(() => {
      this._data = data;
    });
  };

  pushData = (item: any) => {
    runInAction(() => {
      this.db.put(item, (err: any, result: any) => {
        if (!err) {
          this.loadData();
          // console.log("Data added successfully");
        }
      });
    });
  };
  updateData = (id: string, dataItem: any) => {
    runInAction(() => {
      this.db.get(id).then((doc: any) => {
        // console.log(`doc:`, doc);
        // console.log(`dataItem:`, dataItem);
        return this.db.put(
          dataItem,
          { force: true },
          (err: any, result: any) => {
            if (!err) {
              this.loadData();
              // console.log("Data added successfully");
            }
          }
        );
      });
    });
  };

  get dataTotal() {
    return toJS(this._data?.total_rows);
  }

  //Action
  resetStore = () => {
    runInAction(() => {
      this._db = undefined;
    });
  };

  loadData = async () => {
    const data = await this.db.allDocs(
      { include_docs: true, descending: true },
      (err: any, doc: any) => {
        return toJS(doc.rows);
      }
    );
    this.setDataGlobal(data);
  };
}

const dbStoreContext = createContext(new GlobalStore());
export const useGlobalStore = () => {
  return useContext(dbStoreContext);
};
