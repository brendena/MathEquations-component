import React, { createContext, useReducer, Dispatch } from "react";
import {
  pagePropReducer,
  EquationPropsReducer,
  pagePropActions,
  EquationPropsActions,
  
  pagePropType,
  EquationProps
} from "./reducers";
import * as Enums from "./conts/enums"

type InitialStateType = {
  pageProps: pagePropType;
  EquationProps: EquationProps;
};

const initialState = {
  pageProps: {
    orientation: Enums.ORIENTATION.BOTTOM,
    copyCustomEvent: false,
    hideUI: false,
    hideSettingsUI: true
  },
  EquationProps: {
      text: "",
      mathType: Enums.MathTypes.LaTEX,
      color: "#000000",
      height: 100,
      lockWidth: false,
      width:100,
      lockHeight: true
  }
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<pagePropActions | EquationPropsActions>;
}>({
  state: initialState,
  dispatch: () => null
});

const mainReducer = (
  { pageProps, EquationProps }: InitialStateType,
  action: pagePropActions | EquationPropsActions
) => ({
  pageProps: pagePropReducer(pageProps, action),
  EquationProps: EquationPropsReducer(EquationProps, action)
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  //console.log(state);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
