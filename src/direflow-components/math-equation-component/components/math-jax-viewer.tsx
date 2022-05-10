import React from 'react';
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import { AppContext } from "../context";




const MathJaxViewer: React.FC = () => {
  const { state  } = React.useContext(AppContext);

  return (
    <div id="mathJaxViewer">
        <MathJaxContext>
            <MathJax>{"\\(" + state.EquationProps.text + "\\)"}</MathJax>
       </MathJaxContext>
        <p>test~~~~~~~~~~~~~~~~</p>
    </div>
  );
};

export default MathJaxViewer;