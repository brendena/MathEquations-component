type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
      ? {
          type: Key;
        }
      : {
          type: Key;
          payload: M[Key];
        }
  };
  
  export enum Types {
    Create = "CREATE_PRODUCT",
    Delete = "DELETE_PRODUCT",
    Add = "ADD_PRODUCT",
    equation_changed = "equation_changed"
  }
  
  // Product
  
  type ProductType = {
    id: number;
    name: string;
    price: number;
  };
  
  type ProductPayload = {
    [Types.Create]: {
      id: number;
      name: string;
      price: number;
    };
    [Types.Delete]: {
      id: number;
    };
  };
  
  export type ProductActions = ActionMap<ProductPayload>[keyof ActionMap<
    ProductPayload
  >];
  
  export const productReducer = (
    state: ProductType[],
    action: ProductActions | EquationPropsActions
  ) => {
    switch (action.type) {
      case Types.Create:
        return [
          ...state,
          {
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price
          }
        ];
      case Types.Delete:
        return [...state.filter(product => product.id !== action.payload.id)];
      default:
        return state;
    }
  };
  
  //Equation
  
  export type EquationProps = {
    text: string;
  };
  

  type EquationPropsPayload = {
    [Types.equation_changed]: string;
  };
  
  export type EquationPropsActions = ActionMap<
    EquationPropsPayload
  >[keyof ActionMap<EquationPropsPayload>];
  
  export const EquationPropsReducer = (
    state: EquationProps,
    action: ProductActions | EquationPropsActions
  ) => {
    switch (action.type) {
      case Types.equation_changed:
        return state;// modify this
      default:
        return state;
    }
  };
  