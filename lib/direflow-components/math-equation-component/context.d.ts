import React, { Dispatch } from "react";
import { pagePropActions, EquationPropsActions, pagePropType, EquationProps } from "./reducers";
declare type InitialStateType = {
    pageProps: pagePropType;
    EquationProps: EquationProps;
};
declare const AppContext: React.Context<{
    state: InitialStateType;
    dispatch: Dispatch<pagePropActions | EquationPropsActions>;
}>;
declare const AppProvider: React.FC;
export { AppProvider, AppContext };
