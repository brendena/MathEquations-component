import React, { useState, useEffect } from 'react';
import { Types } from "./reducers";
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
  height: number;
//pageProp
  copyCustomEvent: boolean
  orientation: Enums.ORIENTATION;
  hide: boolean;
}

interface Props {
    props:IProps,
}

const UpdateProps: React.FC<Props> = ({props, children }) => {
    
    const { dispatch } = React.useContext(AppContext);
    const [localProps,setLocalProps] = useState(props);

    useEffect(() => {
        if(!isEqualsJson(props,localProps))
        {
            if(localProps.color !== props.color && props.color!== undefined){
                dispatch({type:Types.CHANGE_EQUATION_COLOR, payload:props.color});
            }
            if(localProps.height !== props.height && props.height !== undefined){
                dispatch({type:Types.CHANGE_EQUATION_HEIGHT, payload:props.height});
            }
            if(localProps.mathType !== props.mathType && props.mathType !== undefined){
                dispatch({type:Types.MATH_TYPE_CHANGED, payload:props.mathType});
            }
            if(localProps.text !== props.text && props.text !== undefined){
                dispatch({type:Types.EQUATION_CHANGED, payload:props.text});
            }
            if(localProps.orientation !== props.orientation && props.orientation !== undefined){
                dispatch({type:Types.CHANGE_LAYOUT_ORIENTATION, payload:props.orientation});
            }
            if(localProps.copyCustomEvent !== props.copyCustomEvent && props.copyCustomEvent !== undefined){
                dispatch({type:Types.SET_COPY_CUSTOM_EVENT, payload:props.copyCustomEvent});
            }
            if(localProps.hide !== props.hide && props.hide !== undefined){
                dispatch({type:Types.CHANGE_UI_HIDE, payload:props.hide});
            }
            console.log(props)
            setLocalProps(props);
        }
    },[props, localProps, dispatch]);
    return (
        <>
            {children}
        </>
    );
};




export default UpdateProps;
