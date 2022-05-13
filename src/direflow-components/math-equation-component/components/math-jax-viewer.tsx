import React from 'react';
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import { AppContext } from "../context";




const MathJaxViewer: React.FC = () => {
  const { state  } = React.useContext(AppContext);
  const error = (err:any) =>{ console.log("############Error"); console.log(err)}

  let text = state.EquationProps.text; 
  if(text === "") text=" ";
  return (
    <div id="mathJaxViewer">
        <MathJaxContext   renderMode={"pre"} version={3} onError={error} src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-svg.js" >
            <MathJax typesettingOptions={{fn:"tex2svg"}} text={text} dynamic={true} inline> </MathJax>
       </MathJaxContext>
        <p>test~~~~~~~~~~~~~~~~</p>
    </div>
  );
};


export default MathJaxViewer;