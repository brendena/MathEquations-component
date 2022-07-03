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
    CHANGE_UI_HIDE = "CHANGE_UI_HIDE",
    EQUATION_CHANGED = "EQUATION_CHANGED",
    MATH_TYPE_CHANGED = "MATH_TYPE_CHANGED",
    CHANGED_SIZE_COMPONENT = "CHANGED_SIZE_COMPONENT",
    CHANGE_EQUATION_COLOR = "CHANGE_EQUATION_COLOR",
    CHANGE_EQUATION_HEIGHT = "CHANGE_EQUATION_HEIGHT"
  }
  
  // pageProp
  
  export type pagePropType = {
    orientation: Enums.ORIENTATION;
    copyCustomEvent: boolean;
    hideUI: boolean;
  };
  
  type pagePropPayload = {
    [Types.CHANGE_LAYOUT_ORIENTATION]: Enums.ORIENTATION;
    [Types.CHANGE_UI_HIDE]: boolean
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
      case Types.CHANGE_UI_HIDE:
        return {
          ...state,
          hideUI: action.payload
        }
      default:
        return state;
    }
  };
  
  //Equation
  
  export type EquationProps = {
    text: string;
    mathType: Enums.MathTypes;
    color: string;
    height: number
  };
  

  type EquationPropsPayload = {
    [Types.EQUATION_CHANGED]: string;
    [Types.MATH_TYPE_CHANGED]: Enums.MathTypes;
    [Types.CHANGE_EQUATION_COLOR]: string;
    [Types.CHANGE_EQUATION_HEIGHT]: number;
  };
  
  export type EquationPropsActions = ActionMap<
    EquationPropsPayload
  >[keyof ActionMap<EquationPropsPayload>];
  
  export const EquationPropsReducer = (
    state: EquationProps,
    action: pagePropActions | EquationPropsActions
  ) => {
    switch (action.type) {
      case Types.EQUATION_CHANGED:
        return {...state, text:action.payload};// modify this
      case Types.MATH_TYPE_CHANGED:
        return {...state, mathType:action.payload}
      case Types.CHANGE_EQUATION_COLOR:
        return {...state, color:action.payload}
      case Types.CHANGE_EQUATION_HEIGHT:
        return {...state, height:action.payload}
      default:
        return state;
    }
  };
  