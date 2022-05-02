import React, { createContext, useReducer, Dispatch } from "react";
import {
  productReducer,
  EquationPropsReducer,
  ProductActions,
  EquationPropsActions,

  EquationProps
} from "./reducers";

type ProductType = {
  id: number;
  name: string;
  price: number;
};

type InitialStateType = {
  products: ProductType[];
  EquationProps: EquationProps;
};

const initialState = {
  products: [],
  EquationProps: {
        text: ""
  }
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ProductActions | EquationPropsActions>;
}>({
  state: initialState,
  dispatch: () => null
});

const mainReducer = (
  { products, EquationProps }: InitialStateType,
  action: ProductActions | EquationPropsActions
) => ({
  products: productReducer(products, action),
  EquationProps: EquationPropsReducer(EquationProps, action)
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
