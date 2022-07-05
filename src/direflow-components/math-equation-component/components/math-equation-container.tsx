import React, {useRef } from 'react';
import MathJaxViewer from './math-jax-viewer'
import MathTextInput from './math-text-input'
import * as Enums from '../conts/enums'
import { AppContext } from "../context";
import { useMouseMove } from '../handles/userMouseResize';
import { resizeIcon } from '../conts/base64Images';
import NavBar from "./nav-bar"
import MinimizedUI from './minimizedUI';
import SettingUI from './settingUI';

const MathEquationComponent: React.FC = () => {
  let ref = useRef(null);
  let {mouseResizeStart} = useMouseMove(ref);
  const { state  } = React.useContext(AppContext);

  let verticalUI = false;
  let leftUI = false;
  let hideMargin = "";
  let navBarPosition = ""
  if(state.pageProps.orientation === Enums.ORIENTATION.BOTTOM)
  {
    navBarPosition = "horizontal"
    hideMargin = "marginBottom"
    
  }
  else{
    navBarPosition = "vertical"
    hideMargin = "marginRight"
    verticalUI = true;
  }

  let extensionGridStyles = {}
  if(state.pageProps.hideUI)
  {
    extensionGridStyles = {[hideMargin]:"calc(var(--length-ui) * -1)"}
  }


  return (
    <> 

      <div id="appSpacer"></div>
      <input id="V" type="checkbox" checked={verticalUI} hidden></input> 
      <input id="L" type="checkbox" checked={leftUI}     hidden></input>
        
      <div id="mathExtensionGrid" className={navBarPosition} ref={ref} style={extensionGridStyles}>

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

      <MinimizedUI></MinimizedUI>
      <SettingUI></SettingUI>


  </>
  );
};

export default MathEquationComponent;