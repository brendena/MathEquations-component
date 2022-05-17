import React, {useRef} from 'react';
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import { AppContext } from "../context";
import { useMathJaxImage } from '../handles/useMathJaxImage';



const MathJaxViewer: React.FC = () => {
  const { state  } = React.useContext(AppContext);
  const {mathJaxConRef,canvasRef,addCanvasToClipboard,onDrag,onMouseDown } = useMathJaxImage();

  const error = (err:any) =>{ console.log("############Error"); console.log(err)}


  let text = state.EquationProps.text; 
  if(text === "") text=" ";
  return (
    <div id="mathJaxViewer" ref={mathJaxConRef} draggable={true} onDragStart={onDrag}  onMouseDown={onMouseDown}>
      <div>
          <MathJaxContext   renderMode={"pre"} version={3} onError={error} src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-svg.js" >
              <MathJax typesettingOptions={{fn:"tex2svg"}} text={text} dynamic={true} inline > </MathJax>
        </MathJaxContext>
      </div>

        <canvas ref={canvasRef}>

        </canvas>

        <button onClick={addCanvasToClipboard}>
test copy
        </button>
    </div>
  );
};


export default MathJaxViewer;