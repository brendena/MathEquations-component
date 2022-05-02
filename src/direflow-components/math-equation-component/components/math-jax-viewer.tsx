import React, { FC, useContext, useEffect, useRef } from 'react';
//import * as MathJax from "mathjax/es5/core.js"
import { MathJaxContext, MathJax } from 'better-react-mathjax';



const MathJaxViewer: React.FC = () => {


  return (
    <div>
        <MathJaxContext>
            <MathJax>{"\\(\\frac{10}{4x} \\approx 2^{12}\\)"}</MathJax>
       </MathJaxContext>
        <p>test~~~~~~~~~~~~~~~~</p>
    </div>
  );
};

export default MathJaxViewer;