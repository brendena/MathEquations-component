import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark,faChevronDown, faGear } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import RadioButtonInput from './radioButtonInput';
import { AppContext } from "../context";
import { Types } from '../reducers';
import * as Enums from '../conts/enums'
import { mathEquationIcon } from '../conts/base64Images';

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
          <div>
            <img 
              id="logo" 
              alt="logo"
              draggable={false}
              src={mathEquationIcon}/>
          </div>
          <div>
            {mapData}
          </div>


          <div className='flexSpacer'></div>

          <div>
            <button className='navButton'>
              <FontAwesomeIcon icon={faChevronDown}  className="navButtonIcons"/>
            </button>
            <button className='navButton'>
              <FontAwesomeIcon icon={faGear} className="navButtonIcons"/>
            </button>
            <button className='navButton'>
              <FontAwesomeIcon icon={faGithub} className="navButtonIcons"/>
            </button>
            <button className='navButton'>
              <FontAwesomeIcon icon={faSquareXmark}  className="navButtonIcons"/>
            </button>
          </div>
        </div>
  );
};

/*

          <button className='navButton'>LaTEX</button>
          <button className='navButton'>MathML</button>
          <button className='navButton'>AsciiMath</button>
*/

export default NavBar;