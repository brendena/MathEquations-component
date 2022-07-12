import React from 'react';
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppContext } from "../context";
import { Types } from "../reducers";
import { horizontalLock, verticalLock } from "../conts/base64Images";
interface toolboxInterface
{
    copyEvent: () => void
};

const sizeLargeImage = 100;
const sizeMediumImage = 50;
const sizeSmallImage = 25;

const Toolbox: React.FC<toolboxInterface> = (prop) => {
  const { state,dispatch  } = React.useContext(AppContext);

  let onColorChange =(color: string)=>{
    dispatch({type:Types.CHANGE_EQUATION_COLOR, payload:color})
  }

  let changeHeightImage =(height:number)=>{
    dispatch({type:Types.CHANGE_EQUATION_HEIGHT, payload:height})
  }

  let changeWidthImage = (width:number)=>{
    dispatch({type:Types.CHANGE_EQUATION_HEIGHT, payload:width})
  }

  let toggleHeightLock = ()=>{
    if(state.EquationProps.lockHeight === false || state.EquationProps.lockWidth === true)
      dispatch({type:Types.CHANGE_HEIGHT_LOCK, payload:!state.EquationProps.lockHeight})
  }

  let toggleWidthLock = ()=>{
    if(state.EquationProps.lockWidth === false || state.EquationProps.lockHeight === true)
      dispatch({type:Types.CHANGE_WIDTH_LOCK, payload:!state.EquationProps.lockWidth})
  }


  let largeSelected = "";
  let mediumSelected = "";
  let smallSelected = "";
  if(state.EquationProps.height >= sizeLargeImage){
    largeSelected = "toolBoxSelected"
  }else if(state.EquationProps.height >= sizeMediumImage){
    mediumSelected = "toolBoxSelected"
  }else{
    smallSelected = "toolBoxSelected"
  }

  let heightLockSelected = "";
  let widthLockSelected = "";
  if(state.EquationProps.lockHeight) heightLockSelected = "toolBoxSelected";
  if(state.EquationProps.lockWidth)  widthLockSelected = "toolBoxSelected";

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
      <div style={{"display":"flex", 
                   "alignItems":"center"}} >
        {state.EquationProps.lockHeight &&
            <>
              <input type="number"
                      style={{"maxWidth":"50px"}} 
                      value={state.EquationProps.height} onChange={(e)=>{changeHeightImage(parseInt(e.currentTarget.value))}}>
              </input>
              <span>
                h
              </span>
            </>    
        }



        <img src={verticalLock} style={{"maxHeight":"30px"}} className={heightLockSelected} onClick={toggleHeightLock}></img>
        {state.EquationProps.lockWidth &&
            <>
              <input type="number"
                     style={{"maxWidth":"50px"}} 
                     value={state.EquationProps.width} onChange={(e)=>{changeHeightImage(parseInt(e.currentTarget.value))}}>
              </input>
              <span>
                w
              </span>
            </>
        }

        <img src={horizontalLock} style={{"maxHeight":"30px"}} className={widthLockSelected} onClick={toggleWidthLock}></img>
      </div>
    </div>
);
};


export default Toolbox;