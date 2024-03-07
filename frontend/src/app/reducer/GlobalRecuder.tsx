import { createContext, useReducer } from "react";
import { IGlobalDialogArgs } from "../components/GlobalDialog";

interface IGlobalReducerState {
  globalDialog: IGlobalDialogArgs;
}
interface IGlobalReducerStateArgs {
  globalDialog: Partial<IGlobalDialogArgs>;
}

enum GlobalReducerActionType {
  "UpdateGlobalDialog"="UpdateGlobalDialog"
}

interface IGlobalReducerAction {
  type: GlobalReducerActionType.UpdateGlobalDialog;
  payload: IGlobalReducerStateArgs;
}
function GlobalReducer(
  state: IGlobalReducerState,
  action: IGlobalReducerAction
) {
  switch (action.type) {
    case GlobalReducerActionType.UpdateGlobalDialog:
      return {
        ...state,
        globalDialog: {
          ...state.globalDialog,
          ...action.payload.globalDialog,
        },
      };
  }
  return state;
}

const initGlobalReducer: IGlobalReducerState = {
  globalDialog: {
    open: false,
    title: "",
    handleClose: () => {},
  },
};

const initGlobalReducerContext: {
  state: IGlobalReducerState;
  dispatch: (action: IGlobalReducerAction) => void;
} = {
  state: initGlobalReducer,
  dispatch: (action: IGlobalReducerAction) => {},
};

const GlobalReducerContext = createContext(initGlobalReducerContext);

export type { IGlobalReducerState, IGlobalReducerAction };
export { GlobalReducer, GlobalReducerContext, initGlobalReducer, GlobalReducerActionType };
