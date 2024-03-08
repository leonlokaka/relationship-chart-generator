import { createContext, useReducer } from "react";
import { IGlobalDialogArgs } from "../components/GlobalDialog";

interface IGlobalReducerState {
  globalDialog: IGlobalDialogArgs;
  cyContextMenuEvent: {
    eventName: string | null;
    event: any;
  };
}
interface IGlobalReducerStateArgs {
  globalDialog?: Partial<IGlobalReducerState["globalDialog"]>;
  cyContextMenuEvent?: IGlobalReducerState["cyContextMenuEvent"];
}

enum GlobalReducerActionType {
  "UpdateGlobalDialog" = "UpdateGlobalDialog",
  "cyContentMenuEventTrigger" = "cyContentMenuEventTrigger",
}

interface IGlobalReducerAction {
  type: GlobalReducerActionType;
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
    case GlobalReducerActionType.cyContentMenuEventTrigger:
      return {
        ...state,
        cyContextMenuEvent: action.payload.cyContextMenuEvent,
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
  cyContextMenuEvent: {
    eventName: null,
    event: null,
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
export {
  GlobalReducer,
  GlobalReducerContext,
  initGlobalReducer,
  GlobalReducerActionType,
};
