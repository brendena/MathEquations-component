import React, { FC, useContext, useEffect, useRef } from 'react';
import MathJaxViewer from './math-jax-viewer'
import MathTextInput from './math-text-input'
import { useMouseMove } from '../handles/userMouseResize';


const MathEquationComponent: React.FC = () => {
  let ref = useRef(null);
  let {mouseResizeStart} = useMouseMove(ref);

  /*
  const config = {
    loader: { load: ["input/asciimath"] }
  };
  */
  console.log("test")
  return (
    <> 
      <div id="appSpacer"></div>
      <div id="mathExtensionGrid" className={"horizontal"} ref={ref}>
        <div id="textInputContainer">
          <MathTextInput></MathTextInput>
        </div>
        <div id="textOutput">
          <MathJaxViewer></MathJaxViewer>
        </div>
        <div id="navBar">bottom left</div>

        
        <img id="handle" 
            src="resizeIcon.svg"
            alt="triangle with all three sides equal"
            draggable={false}
            onMouseDown={()=>{mouseResizeStart()}}
            />
      </div>
  </>
  );
};

export default MathEquationComponent;