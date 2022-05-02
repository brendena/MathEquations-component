import React from 'react';
import { AppContext } from "../context";

const MathTextInput: React.FC = () => {
  const { state ,dispatch } = React.useContext(AppContext);
  console.log(state.EquationProps.text)
  return (
    <>
        <textarea id="inputTextMathEquation" 
                  placeholder="equation location">

        </textarea>
    </>
  );
};

export default MathTextInput;