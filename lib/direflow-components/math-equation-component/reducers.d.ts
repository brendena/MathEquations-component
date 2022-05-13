import * as Enums from "./conts/enums";
declare type ActionMap<M extends {
    [index: string]: any;
}> = {
    [Key in keyof M]: M[Key] extends undefined ? {
        type: Key;
    } : {
        type: Key;
        payload: M[Key];
    };
};
export declare enum Types {
    CHANGE_LAYOUT_ORIENTATION = "CHANGE_LAYOUT_ORIENTATION",
    equation_changed = "EQUATION_CHANGED",
    MATH_TYPE_CHANGED = "MATH_TYPE_CHANGED"
}
export declare type pagePropType = {
    orientation: Enums.ORIENTATION;
};
declare type pagePropPayload = {
    [Types.CHANGE_LAYOUT_ORIENTATION]: {
        orientation: Enums.ORIENTATION;
    };
};
export declare type pagePropActions = ActionMap<pagePropPayload>[keyof ActionMap<pagePropPayload>];
export declare const pagePropReducer: (state: pagePropType, action: pagePropActions | EquationPropsActions) => pagePropType | {
    id: Enums.ORIENTATION;
    orientation: Enums.ORIENTATION;
};
export declare type EquationProps = {
    text: string;
    mathType: Enums.MathTypes;
};
declare type EquationPropsPayload = {
    [Types.equation_changed]: string;
    [Types.MATH_TYPE_CHANGED]: Enums.MathTypes;
};
export declare type EquationPropsActions = ActionMap<EquationPropsPayload>[keyof ActionMap<EquationPropsPayload>];
export declare const EquationPropsReducer: (state: EquationProps, action: pagePropActions | EquationPropsActions) => EquationProps;
export {};
