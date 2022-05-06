import React, { FC, useContext, useEffect, useRef } from 'react';
import * as Enums from '../conts/enums'

interface RadioButtonProps {
    forInput:string,
    checked:boolean,
    name:string,
    classNameButton:string,
    onChange:(a: string) => void;
}




const RadioButtonInput: React.FC<RadioButtonProps> = (props) => {
  return (
    < >
      <input  type="radio" id={props.forInput + "_Button"} name="amount" style={{display:"none"}} defaultChecked={props.checked} onChange={(event)=>{props.onChange(props.forInput); }} />
      <label htmlFor={props.forInput + "_Button"} className={props.classNameButton} >{props.forInput}  </label>
    </>
  );
};


export default RadioButtonInput;