import React from 'react';
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface toolboxInterface
{
    copyEvent: () => void
};
const Toolbox: React.FC<toolboxInterface> = (prop) => {

  return (
      <div id="toolbox">
        
        <button onClick={prop.copyEvent} className="buttonOptionsImage">
          copy 
        </button>
        <input  className="removeStyles" type="color" />
        <button className='toolbarIcons removeStyles'>
          <FontAwesomeIcon icon={faImage}  style={{width:'20px'}}/>
        </button>
        <button className='toolbarIcons removeStyles'>
          <FontAwesomeIcon icon={faImage}  style={{width:'15px'}} />
        </button>
        <button className='toolbarIcons removeStyles'>
          <FontAwesomeIcon icon={faImage}  style={{width:'10px'}}/>
        </button>
      </div>
  );
};


export default Toolbox;