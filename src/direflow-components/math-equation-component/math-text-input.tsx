import React, { FC, useContext, useEffect, useRef } from 'react';
//import * as MathJax from "mathjax/es5/core.js"



const MathTextInput: React.FC = () => {


  return (
    <>
        <textarea id="inputTextMathEquation" 
                  placeholder="equation location">

        </textarea>
    </>
  );
};

export default MathTextInput;