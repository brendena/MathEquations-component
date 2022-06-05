import React from 'react';
//*
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { TypesettingFunction } from 'better-react-mathjax/MathJaxContext/MathJaxContext';


import { AppContext } from "../context";
import { useMathJaxImage } from '../handles/useMathJaxImage';
import { MathTypes } from '../conts/enums';
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Toolbox from './toolbox';
/*
https://github.com/fast-reflexes/better-react-mathjax/issues/17
try and fix the included src problem
*/


const MathJaxViewer: React.FC = () => {
  const { state  } = React.useContext(AppContext);
  const {mathJaxConRef,canvasRef,addCanvasToClipboard,onDrag,onMouseDown } = useMathJaxImage();

  const error = (err:any) =>{ console.log("############Error"); console.log(err)}


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
    <div id="mathJaxViewer"  ref={mathJaxConRef} draggable={true} onDragStart={onDrag}  onMouseDown={onMouseDown}>
      <Toolbox copyEvent={addCanvasToClipboard}></Toolbox>
      <div>
          <MathJaxContext   renderMode={"pre"} version={3} onError={error} src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js" >
              <MathJax typesettingOptions={{fn:functionType}} text={text} dynamic={true} inline > </MathJax>
          </MathJaxContext>
      </div>

      <canvas ref={canvasRef}>

      </canvas>


    </div>
  );
};


export default MathJaxViewer;