import React, { FC, useContext, useEffect, useRef } from 'react';
import { EventContext, Styled } from 'direflow-component';
import styles from './App.css';
import MathJaxViewer from './components/math-jax-viewer'
import MathTextInput from './components/math-text-input'
import { AppProvider } from "./context";

interface IProps {
  componentTitle: string;
  sampleList: string[];
}

const App: FC<IProps> = (props) => {
  let ref = useRef(null);

  const mouseMove = (pos : MouseEvent)=>{
    let current : any = ref.current
    if(current  != null)
    {
      console.log(pos.pageY + " "  + pos.pageX)
      console.log(current)
      console.log(document)
      current.style.setProperty('--length-ui', document.documentElement.clientWidth - pos.pageX+ "px");
      //console.log(ref.current);
    }
  }

  const mouseResizeStart = ()=>{
    
    console.log("resize started");
    document.body.addEventListener("mousemove", mouseMove)
    document.body.addEventListener("mouseup", ()=>{
      document.body.removeEventListener("mousemove",mouseMove,false);
    }, {"once": true});
  }


  return (

    <AppProvider>
      <Styled styles={styles}>
          <div>
            <div id="appSpacer"></div>
            <div id="mathExtensionGrid" className={"vertical"} ref={ref}>
              <div id="textInputContainer">
                <MathTextInput></MathTextInput>
              </div>
              <div id="textOutput">
                <MathJaxViewer></MathJaxViewer>
              </div>
              <div id="selectLanguage">bottom left</div>
              <div id="otherSettings">bottom right</div>

              
              <img id="handle" 
                  src="resizeIcon.svg"
                  alt="triangle with all three sides equal"
                  draggable={false}
                  onMouseDown={()=>{mouseResizeStart()}}
                  />
            </div>
          </div>
        
      </Styled>
    </AppProvider>
  );
};

App.defaultProps = {
  componentTitle: 'Math Equation Component',
  sampleList: [
    'Create with React',
    'Build as Web Component',
    'Use it anywhere!',
  ],
}

export default App;
