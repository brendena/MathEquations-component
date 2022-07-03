import React from 'react';
import { mathEquationIcon } from '../conts/base64Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark,faMaximize } from '@fortawesome/free-solid-svg-icons'
import { AppContext } from "../context";
import { Types } from '../reducers';


const MinimizedUI: React.FC = () => {
    const { state, dispatch  } = React.useContext(AppContext);

    let openUI = ()=>{
        dispatch({
            type: Types.CHANGE_UI_HIDE,
            payload : false
        });
    }
    let styleShow = {};

    if(state.pageProps.hideUI)
    {
        styleShow={"margin":"0px"};
    }

    return (
      <div id="reducedUI" style={styleShow}>
        <div id="logoContainer"> 
           
          <img 
            id="logo" 
            alt="logo"
            draggable={false}
            src={mathEquationIcon}/>
        </div>
        
        <button className='navButton minimizedUIButtons' id="navButtonMinimize" onClick={openUI}>
            <FontAwesomeIcon icon={faMaximize}  className="navButtonIcons"/>
        </button>
    
        <button className='navButton minimizedUIButtons' id="navButtonSettings">
            <FontAwesomeIcon icon={faSquareXmark} className="navButtonIcons"/>
        </button>

    </div>
    );
};

export default MinimizedUI;