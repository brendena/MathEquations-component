import React, { FC, useContext, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark,faChevronDown, faGear } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const NavBar: React.FC = () => {
  return (

        <div id="navBar">
          <img id="logo" 
            src="logoClearBackground.svg"
            alt="logo"
            draggable={false}
            />
          <button className='navButton'>LaTEX</button>
          <button className='navButton'>MathML</button>
          <button className='navButton'>AsciiMath</button>
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

export default NavBar;