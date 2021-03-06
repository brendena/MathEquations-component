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
    CHANGE_SETTINGS_HIDE = "CHANGE_SETTINGS_HIDE",
    EQUATION_CHANGED = "EQUATION_CHANGED",
    MATH_TYPE_CHANGED = "MATH_TYPE_CHANGED",
    CHANGED_SIZE_COMPONENT = "CHANGED_SIZE_COMPONENT",
    CHANGE_EQUATION_COLOR = "CHANGE_EQUATION_COLOR",
    CHANGE_EQUATION_HEIGHT = "CHANGE_EQUATION_HEIGHT",
    CHANGE_EQUATION_WIDTH = "CHANGE_EQUATION_WIDTH",
    CHANGE_HEIGHT_LOCK = "CHANGE_HEIGHT_LOCK",
    CHANGE_WIDTH_LOCK = "CHANGE_WIDTH_LOCK",
    SET_COPY_CUSTOM_EVENT = "SET_COPY_CUSTOM_EVENT"
  }
  
  // pageProp
  
  export type pagePropType = {
    orientation: Enums.ORIENTATION;
    copyCustomEvent: boolean;
    hideUI: boolean;
    hideSettingsUI: boolean;
  };
  
  type pagePropPayload = {
    [Types.CHANGE_LAYOUT_ORIENTATION]: Enums.ORIENTATION;
    [Types.CHANGE_UI_HIDE]: boolean,
    [Types.CHANGE_SETTINGS_HIDE]: boolean,
    [Types.SET_COPY_CUSTOM_EVENT]: boolean
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
        };
      case Types.CHANGE_SETTINGS_HIDE:
        return {
          ...state,
          hideSettingsUI: action.payload
        }
      case Types.SET_COPY_CUSTOM_EVENT:
        return {
          ...state,
          copyCustomEvent: action.payload
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
    height: number;
    lockWidth: boolean;
    width: number;
    lockHeight:boolean;
  };
  

  type EquationPropsPayload = {
    [Types.EQUATION_CHANGED]: string;
    [Types.MATH_TYPE_CHANGED]: Enums.MathTypes;
    [Types.CHANGE_EQUATION_COLOR]: string;
    [Types.CHANGE_EQUATION_HEIGHT]: number;
    [Types.CHANGE_EQUATION_WIDTH]: number;
    [Types.CHANGE_WIDTH_LOCK]: boolean;
    [Types.CHANGE_HEIGHT_LOCK]: boolean;
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
      case Types.CHANGE_EQUATION_WIDTH:
        return {...state, width:action.payload}
      case Types.CHANGE_WIDTH_LOCK:
        return {...state, lockWidth:action.payload}
      case Types.CHANGE_HEIGHT_LOCK:
        return {...state, lockHeight:action.payload}
      default:
        return state;
    }
  };
  