import React, { FC, useState, useRef } from 'react';
import { EventContext, Styled } from 'direflow-component';
import { AppProvider } from "./context";
import { Types } from "./reducers";
import MathEquationComponent from './components/math-equation-container';
import * as Enums from "./conts/enums"
import { AppContext } from "./context";


const isEqualsJson = (obj1:any,obj2:any)=>{
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
  
    //return true when the two json has same length and all the properties has same value key by key
    return keys1.length === keys2.length && Object.keys(obj1).every(key=>obj1[key]==obj2[key]);
  }
  


interface IProps {
//these are all Equation props
  text: string;
  mathType: Enums.MathTypes;
  color: string;
  height: number
//pageProp
  copyCustomEvent: boolean
}

interface Props {
    props:IProps,
}

const UpdateProps: React.FC<Props> = ({props, children }) => {
    
    const { state, dispatch } = React.useContext(AppContext);
    const [localProps,setLocalProps] = useState(props);
    let refTest = useRef(null)
  
    if(!isEqualsJson(props,localProps))
    {
        if(props.color!= undefined){
            dispatch({type:Types.CHANGE_EQUATION_COLOR, payload:props.color});
        }
        if(props.height!= undefined){
            dispatch({type:Types.CHANGE_EQUATION_HEIGHT, payload:props.height});
        }
        if(props.mathType != undefined){
            dispatch({type:Types.MATH_TYPE_CHANGED, payload:props.mathType});
        }
        if(props.text != undefined){
            dispatch({type:Types.EQUATION_CHANGED, payload:props.text});
        }
        setLocalProps(props)
    }
    
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n")
    console.log(props)
    
    return (
        <>
            {children}
        </>
    );
};




export default UpdateProps;
