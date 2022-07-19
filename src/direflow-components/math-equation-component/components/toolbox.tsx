import React from 'react';
import { faImage, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppContext } from "../context";
import { Types } from "../reducers";
import { horizontalLock, verticalLock } from "../conts/base64Images";
import DownloadButton from "./downloadButton"


interface toolboxInterface
{
    copyEvent: () => void,
    generateImage: () => Promise<Blob>
};

const sizeLargeImage = 100;
const sizeMediumImage = 50;
const sizeSmallImage = 25;

const Toolbox: React.FC<toolboxInterface> = (prop) => {
  const { state,dispatch  } = React.useContext(AppContext);

  let onColorChange =(color: string)=>{
    dispatch({type:Types.CHANGE_EQUATION_COLOR, payload:color})
  }

  let changeImageSize =(defaultSize:number)=>{
    if(state.EquationProps.lockHeight){
      dispatch({type:Types.CHANGE_EQUATION_HEIGHT, payload:defaultSize})
    }
    else{
      dispatch({type:Types.CHANGE_EQUATION_WIDTH, payload:defaultSize * 10})
    }
  }

  let changeHeightImage =(height:number)=>{

    dispatch({type:Types.CHANGE_EQUATION_HEIGHT, payload:height})
  }


  let changeWidthImage = (width:number)=>{
    dispatch({type:Types.CHANGE_EQUATION_WIDTH, payload:width})
  }


  let toggleLockedParam = ()=>{
      dispatch({type:Types.CHANGE_HEIGHT_LOCK, payload:!state.EquationProps.lockHeight})
      dispatch({type:Types.CHANGE_WIDTH_LOCK, payload:!state.EquationProps.lockWidth})
  }


  let largeSelected = "";
  let mediumSelected = "";
  let smallSelected = "";
  if(state.EquationProps.lockHeight){
    if(state.EquationProps.height >= sizeLargeImage){
      largeSelected = "toolBoxSelected"
    }else if(state.EquationProps.height >= sizeMediumImage){
      mediumSelected = "toolBoxSelected"
    }else{
      smallSelected = "toolBoxSelected"
    }
  }
  else{
    if(state.EquationProps.width >= (sizeLargeImage * 10)){
      largeSelected = "toolBoxSelected"
    }else if(state.EquationProps.width >= (sizeMediumImage  * 10)){
      mediumSelected = "toolBoxSelected"
    }else{
      smallSelected = "toolBoxSelected"
    }
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
      
      <DownloadButton generateImage={prop.generateImage}></DownloadButton>

      <button className={largeSelected + ' toolbarIcons removeStyles'} onClick={()=>{changeImageSize(sizeLargeImage);}}>
        <FontAwesomeIcon icon={faImage}  style={{width:'20px'}}/>
      </button>
      <button className={mediumSelected + ' toolbarIcons removeStyles'} onClick={()=>{changeImageSize(sizeMediumImage);}}>
        <FontAwesomeIcon icon={faImage}  style={{width:'15px'}} />
      </button>
      <button className={smallSelected + ' toolbarIcons removeStyles'} onClick={()=>{changeImageSize(sizeSmallImage);}}>
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

        <img src={verticalLock} style={{"maxHeight":"30px"}} className={heightLockSelected} onClick={toggleLockedParam} alt={"lock vertical width"}></img>
        {state.EquationProps.lockWidth &&
            <>
              <input type="number"
                     style={{"maxWidth":"50px"}} 
                     value={state.EquationProps.width} onChange={(e)=>{changeWidthImage(parseInt(e.currentTarget.value))}}>
              </input>
              <span>
                w
              </span>
            </>
        }

        <img src={horizontalLock} style={{"maxHeight":"30px"}} className={widthLockSelected} onClick={toggleLockedParam} alt={"lock horizontal width"}></img>
      </div>
    </div>
);
};


export default Toolbox;