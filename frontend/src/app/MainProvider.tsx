import { useReducer } from "react";
import ThemeRegistry from "./ThemeRegistry/ThemeRegistry";
import {
  GlobalReducer,
  GlobalReducerContext,
  initGlobalReducer,
} from "./reducer/GlobalRecuder";
import { GlobalDialog } from "./components/GlobalDialog";

export default function MainProvider({ children }: any) {
  const [state, dispatch] = useReducer(
    GlobalReducer,
    {...initGlobalReducer}
  );

  return (
    <ThemeRegistry>
      <GlobalReducerContext.Provider value={{ state, dispatch }}>
        {children}
        <GlobalDialog state={state} />
      </GlobalReducerContext.Provider>
    </ThemeRegistry>
  );
}
