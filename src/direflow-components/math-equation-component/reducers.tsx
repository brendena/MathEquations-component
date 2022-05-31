import * as Enums from "./conts/enums"

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
    CHANGE_LAYOUT_ORIENTATION = "CHANGE_LAYOUT_ORIENTATION",
    equation_changed = "EQUATION_CHANGED",
    MATH_TYPE_CHANGED = "MATH_TYPE_CHANGED",
    CHANGED_SIZE_COMPONENT = "CHANGED_SIZE_COMPONENT" 
  }
  
  // pageProp
  
  export type pagePropType = {
    orientation: Enums.ORIENTATION;
  };
  
  type pagePropPayload = {
    [Types.CHANGE_LAYOUT_ORIENTATION]: Enums.ORIENTATION;
  };
  
  export type pagePropActions = ActionMap<pagePropPayload>[keyof ActionMap<
    pagePropPayload
  >];
  
  export const pagePropReducer = (
    state: pagePropType,
    action: pagePropActions | EquationPropsActions
  ) => {
    switch (action.type) {
      case Types.CHANGE_LAYOUT_ORIENTATION:
        return {
          ...state,
          orientation: action.payload,
          
        };
      default:
        return state;
    }
  };
  
  //Equation
  
  export type EquationProps = {
    text: string;
    mathType: Enums.MathTypes;
  };
  

  type EquationPropsPayload = {
    [Types.equation_changed]: string;
    [Types.MATH_TYPE_CHANGED]: Enums.MathTypes;
  };
  
  export type EquationPropsActions = ActionMap<
    EquationPropsPayload
  >[keyof ActionMap<EquationPropsPayload>];
  
  export const EquationPropsReducer = (
    state: EquationProps,
    action: pagePropActions | EquationPropsActions
  ) => {
    switch (action.type) {
      case Types.equation_changed:
        return {...state, text:action.payload};// modify this
      case Types.MATH_TYPE_CHANGED:
        return {...state, mathType:action.payload}
      default:
        return state;
    }
  };
  