import React, { FC } from 'react';
import {  Styled } from 'direflow-component';
import { AppProvider } from "./context";
import MathEquationComponent from './components/math-equation-container';
import * as Enums from "./conts/enums"
import UpdateProps from './UpdateProps';


import appStyles from './App.css';
import navStyles from "./nav.css";
import settingStyles from "./setting.css";
import toolbarStyles from "./toolbar.css"
/* i can add multiple styles here */


interface IProps {
//these are all Equation props
  text: string;
  mathType: Enums.MathTypes;
  color: string;
  height: number;
//pageProp
  copyCustomEvent: boolean;
  orientation: Enums.ORIENTATION;
}

const App: FC<IProps> = (props) => {




  /*
  The enclosde div is needed because of the way the <Styled> tag works.  
  It basically give a scope to the first elment under it and a component doesn't seem to work.  
  So it need to be a div.
  */
  return (
    <AppProvider>
      <Styled styles={[navStyles,appStyles,settingStyles, toolbarStyles]} scoped={false}>
        <UpdateProps props={props}>
          <div> 
            <MathEquationComponent></MathEquationComponent>
          </div>
        </UpdateProps>
      </Styled>
    </AppProvider>
  );
};


App.defaultProps = {
  color:"0xffffff",
  height: 100,
  text:"",
  mathType:Enums.MathTypes.LaTEX,
  copyCustomEvent: false,
  orientation: Enums.ORIENTATION.BOTTOM
}


export default App;
