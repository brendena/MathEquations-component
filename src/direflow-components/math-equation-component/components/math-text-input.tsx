import React from 'react';
import { AppContext } from "../context";
import { Types } from "../reducers";

const MathTextInput: React.FC = () => {
  const { state ,dispatch } = React.useContext(AppContext);
  console.log(state.EquationProps.text)

  const textUpdated = (e : React.ChangeEvent<HTMLTextAreaElement>)=>{
    console.log(e.currentTarget.value);
    dispatch({type:Types.equation_changed, payload:e.currentTarget.value})
  }

  return (
    <>
        <textarea id="inputTextMathEquation" 
                  placeholder="equation location"
                  onChange={textUpdated}
                  value={state.EquationProps.text}>

        </textarea>
    </>
  );
};

export default MathTextInput;