import React from 'react';

interface RadioButtonProps {
    forInput:string,
    checked:boolean,
    name:string,
    classNameButton:string,
    hideInput:boolean,
    onChange:(a: string) => void;
}




const RadioButtonInput: React.FC<RadioButtonProps> = (props) => {
  return (
    < >
      <input  type="radio" id={props.forInput + "_Button"} name={props.name} hidden={props.hideInput}  defaultChecked={props.checked} onChange={(event)=>{props.onChange(props.forInput); }} />
      <label htmlFor={props.forInput + "_Button"} className={props.classNameButton} >{props.forInput}  </label>
    </>
  );
};


export default RadioButtonInput;