import React, { FC, useState, useRef } from 'react';
import { EventContext, Styled } from 'direflow-component';
import { AppProvider } from "./context";
import MathEquationComponent from './components/math-equation-container';

import appStyles from './App.css';
import navStyles from "./nav.css";
import toolbarStyles from "./toolbar.css"
/* i can add multiple styles here */

const isEqualsJson = (obj1:any,obj2:any)=>{
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  //return true when the two json has same length and all the properties has same value key by key
  return keys1.length === keys2.length && Object.keys(obj1).every(key=>obj1[key]==obj2[key]);
}

interface IProps {
  color: string,
  height: number,
  copyCustomEvent: boolean
}

const App: FC<IProps> = (props) => {
  const [localProps,setLocalProps] = useState(props);
  let refTest = useRef(null)

  if(!isEqualsJson(localProps,props))
  {
    if(localProps.color != props.color){
      //change this state
    }
    if(localProps.height != props.height){

    }
    if(localProps.copyCustomEvent != props.copyCustomEvent){

    }
    setLocalProps(props);

  }
  console.log(App)
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n")
  console.log(props)
  /*
  The enclosde div is needed because of the way the <Styled> tag works.  
  It basically give a scope to the first elment under it and a component doesn't seem to work.  
  So it need to be a div.
  */
  return (
    <AppProvider>
      <Styled styles={[navStyles,appStyles,toolbarStyles]} scoped={false}>
        <div> 
          <MathEquationComponent></MathEquationComponent>
        </div>
      </Styled>
    </AppProvider>
  );
};

App.defaultProps = {
  color:"0xffffff",
  height: 100,
  copyCustomEvent: false
}

export default App;
