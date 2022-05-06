import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark,faChevronDown, faGear } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import RadioButtonInput from './radioButtonInput';
import { AppContext } from "../context";
import { Types } from '../reducers';
import * as Enums from '../conts/enums'


const NavBar: React.FC = () => {

  const { state, dispatch  } = React.useContext(AppContext);
  
  console.log("testing this out")

  const onChangeRadioF = (mathTypeString: string)=>{
    const mathType = mathTypeString as Enums.MathTypes;
    dispatch({
      type: Types.MATH_TYPE_CHANGED,
      payload : mathType
    });
  }

  let data = Enums.ListMathTypes.map((mathType)=>{
    return {"id": mathType, selected : mathType === state.EquationProps.mathType}
  })



  let mapData = data.map((mathTypes)=>{
    return <RadioButtonInput key={mathTypes.id} forInput={mathTypes.id} checked={mathTypes.selected} name="mathTypes" classNameButton='navButton' onChange={onChangeRadioF}></RadioButtonInput>

  });

  return (

        <div id="navBar">
          <img id="logo" 
            src="logoClearBackground.svg"
            alt="logo"
            draggable={false}
            />

          {mapData}



          <div className='flexSpacer'></div>
          <button className='navButton navButtonIcons'>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <button className='navButton navButtonIcons'>
            <FontAwesomeIcon icon={faGear} />
          </button>
          <button className='navButton navButtonIcons'>
            <FontAwesomeIcon icon={faGithub} />
          </button>
          <button className='navButton navButtonIcons'>
            <FontAwesomeIcon icon={faSquareXmark} />
          </button>
        </div>
  );
};

/*

          <button className='navButton'>LaTEX</button>
          <button className='navButton'>MathML</button>
          <button className='navButton'>AsciiMath</button>
*/

export default NavBar;