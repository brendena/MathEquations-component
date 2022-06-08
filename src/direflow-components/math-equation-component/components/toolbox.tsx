import React, { ReactEventHandler } from 'react';
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppContext } from "../context";
import { Types } from "../reducers";
interface toolboxInterface
{
    copyEvent: () => void
};

const sizeLargeImage = 200;
const sizeMediumImage = 100;
const sizeSmallImage = 25;

const Toolbox: React.FC<toolboxInterface> = (prop) => {
  const { state,dispatch  } = React.useContext(AppContext);

  let onColorChange =(color: string)=>{
    dispatch({type:Types.CHANGE_EQUATION_COLOR, payload:color})
  }

  let changeHeightImage =(height:number)=>{
    dispatch({type:Types.CHANGE_EQUATION_HEIGHT, payload:height})
  }

  let largeSelected = "";
  let mediumSelected = "";
  let smallSelected = "";
  if(state.EquationProps.height >= sizeLargeImage){
    largeSelected = "sizeSelected"
  }else if(state.EquationProps.height >= sizeMediumImage){
    mediumSelected = "sizeSelected"
  }else{
    smallSelected = "sizeSelected"
  }

  return (
    <div id="toolbox">
      
      <button onClick={prop.copyEvent} className="buttonOptionsImage">
        copy 
      </button>
      <input  className="removeStyles" type="color" onChange={(e)=>{onColorChange(e.currentTarget.value)}} value={state.EquationProps.color}/>
      <button className={largeSelected + ' toolbarIcons removeStyles'} onClick={()=>{changeHeightImage(sizeLargeImage);}}>
        <FontAwesomeIcon icon={faImage}  style={{width:'20px'}}/>
      </button>
      <button className={mediumSelected + ' toolbarIcons removeStyles'} onClick={()=>{changeHeightImage(sizeMediumImage);}}>
        <FontAwesomeIcon icon={faImage}  style={{width:'15px'}} />
      </button>
      <button className={smallSelected + ' toolbarIcons removeStyles'} onClick={()=>{changeHeightImage(sizeSmallImage);}}>
        <FontAwesomeIcon icon={faImage}  style={{width:'10px'}} />
      </button>
      <input type="number"
             style={{"maxWidth":"50px"}} 
             value={state.EquationProps.height} onChange={(e)=>{changeHeightImage(parseInt(e.currentTarget.value))}}>
      </input>
      <span>
        px height
      </span>
    </div>
);
};


export default Toolbox;