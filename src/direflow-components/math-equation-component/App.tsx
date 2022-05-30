import React, { FC } from 'react';
import { EventContext, Styled } from 'direflow-component';
import { AppProvider } from "./context";
import MathEquationComponent from './components/math-equation-continer';

import appStyles from './App.css';
import navStyles from "./nav.css"
/* i can add multiple styles here */
interface IProps {
  componentTitle: string;
  sampleList: string[];
}

const App: FC<IProps> = (props) => {


  /*
  The enclosde div is needed because of the way the <Styled> tag works.  
  It basically give a scope to the first elment under it and a component doesn't seem to work.  
  So it need to be a div.
  */
  return (
    <AppProvider>
      <Styled styles={[navStyles,appStyles]} scoped={false}>
        <div> 
          <MathEquationComponent></MathEquationComponent>
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
