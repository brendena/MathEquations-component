import React from 'react';

import { MathJax, MathJaxContext } from '../library/better-react-mathjax_build';
import { TypesettingFunction } from '../library/better-react-mathjax_build/MathJaxContext/MathJaxContext';

import { AppContext } from "../context";
import { useMathJaxImage } from '../handles/useMathJaxImage';
import { MathTypes } from '../conts/enums';
import Toolbox from './toolbox';


require("../../../../mathjax/mathJaxCompiled")
/*
https://github.com/fast-reflexes/better-react-mathjax/issues/17
try and fix the included src problem
*/

interface errorMessageState  {
  currentText :string
  errorMessage : string;
}


const MathJaxViewer: React.FC = () => {
  const { state  } = React.useContext(AppContext);
  const {mathJaxConRef,canvasRef,addCanvasToClipboard,onDrag,onMouseDown,createMaxJaxImage } = useMathJaxImage();

  const error = (err:any) =>{ 
    console.log("############Error"); console.log(err)

  }


  let text = state.EquationProps.text; 
  if(text === "") text=" ";

  let functionType : TypesettingFunction;
  switch(state.EquationProps.mathType)
  {
    case MathTypes.AsciiMath:
      functionType = "asciimath2svg";
      break;
    case MathTypes.LaTEX:
      functionType = "tex2svg";  
      break;
    case MathTypes.MathML:
      functionType = "mathml2svg";
      break;
  }

  return (
    <div id="mathJaxViewer"  ref={mathJaxConRef} >
      <Toolbox copyEvent={addCanvasToClipboard} generateImage={createMaxJaxImage}></Toolbox>

      <div id="mathJaxTextContainer"onMouseDown={onMouseDown} onDragStart={onDrag}  draggable={true} className={"enableDrag"}>
        <MathJaxContext   renderMode={"pre"} version={3} onError={error} >
          <MathJax onError={error} typesettingOptions={{fn:functionType}} text={text} dynamic={true} inline  > </MathJax>
        </MathJaxContext>
      </div>


      <canvas ref={canvasRef} style={{"display":"none"}}>

      </canvas>


    </div>
  );
};


export default MathJaxViewer;