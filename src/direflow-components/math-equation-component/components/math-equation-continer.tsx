import React, {useRef } from 'react';
import MathJaxViewer from './math-jax-viewer'
import MathTextInput from './math-text-input'
import * as Enums from '../conts/enums'
import { AppContext } from "../context";
import { useMouseMove } from '../handles/userMouseResize';
import { resizeIcon } from '../conts/base64Images';
import NavBar from "./nav-bar"

const MathEquationComponent: React.FC = () => {
  let ref = useRef(null);
  let {mouseResizeStart} = useMouseMove(ref);
  const { state  } = React.useContext(AppContext);
  /*
  const config = {
    loader: { load: ["input/asciimath"] }
  };
  */
  let navBarPosition = ""
  if(state.pageProps.orientation === Enums.ORIENTATION.BOTTOM)
  {
    navBarPosition = "horizontal"
  }
  else{
    navBarPosition = "vertical"
  }

  //

  console.log("test")
  return (
    <> 
      <div id="appSpacer"></div>
      <div id="mathExtensionGrid" className={navBarPosition} ref={ref}>
        <div id="textInputContainer">
          <MathTextInput></MathTextInput>
        </div>
        <div id="textOutput">
          <MathJaxViewer></MathJaxViewer>
        </div>
        <NavBar></NavBar>

        
        <img 
          id="handle" 
          alt="triangle with all three sides equal"
          draggable={false}
          onMouseDown={()=>{mouseResizeStart()}}
          src={resizeIcon} />
        
      </div>
  </>
  );
};

export default MathEquationComponent;