import React, {DragEvent} from 'react';
import { AppContext } from "../context";
import { Types } from "../reducers";
import * as pngMeta from "@nashiinc/png-metadata/index.js"

const MathTextInput: React.FC = () => {
  const { state ,dispatch } = React.useContext(AppContext);

  const textUpdated = (e : React.ChangeEvent<HTMLTextAreaElement>)=>{
    dispatch({type:Types.EQUATION_CHANGED, payload:e.currentTarget.value})
  }

  let fetchHTMLImage = (textHtml:string) =>{
    var el = document.createElement( 'html' );
    el.innerHTML = textHtml;
    let images = el.getElementsByTagName( 'img' );
    if(images.length == 1)
    {
      let imgURL = images[0].src;
      //check to see if it's a base64 image
      if(imgURL.substring(0,21) === "data:image/png;base64,"){
        let data = imgURL.split("base64,");
        imgURL = "data:application/octet;base64," + data[1];
      }
      fetch(images[0].src).then((response)=>{
          response.arrayBuffer().then((blobArray)=>{
            const blob8 = new Uint8Array(blobArray);
            let metaData = pngMeta.readMetadata(new Uint8Array(blob8));
            console.log(metaData)
            
            Object.keys(metaData.tEXt).forEach((key:string)=>{
              switch(key){
                case "text":
                  dispatch({type:Types.EQUATION_CHANGED, payload:metaData.tEXt[key]})
                  break;
                case "height":
                  dispatch({type:Types.CHANGE_EQUATION_HEIGHT, payload:metaData.tEXt[key]})
                  break;
                case "lockHeight":
                dispatch({type:Types.CHANGE_HEIGHT_LOCK, payload: metaData.tEXt[key] === "true" })
                  break;
                case "lockWidth":
                  dispatch({type:Types.CHANGE_WIDTH_LOCK, payload: metaData.tEXt[key] === "true" })
                  break;
                case "mathType":
                  dispatch({type:Types.MATH_TYPE_CHANGED, payload:metaData.tEXt[key]})
                  break;
                case "width":
                  dispatch({type:Types.CHANGE_EQUATION_WIDTH, payload:metaData.tEXt[key]})
                  break;
                case "color":
                  dispatch({type:Types.CHANGE_EQUATION_COLOR, payload:metaData.tEXt[key]})
                  break;
              }
            });
          });  
      }).catch((error)=>{
        console.log(error)
      })
    }
  }

  let onDragEnter = (e: DragEvent<HTMLTextAreaElement>)=>{
    e.preventDefault();
    e.currentTarget.classList.add("textInputOnDragEnter")
  }
  let onDragLeave = (e: DragEvent<HTMLTextAreaElement>)=>{
    e.preventDefault();
    e.currentTarget.classList.remove("textInputOnDragEnter")
  } 
  let onDrop = (e: DragEvent<HTMLTextAreaElement>)=>{
    e.preventDefault();
    e.currentTarget.classList.remove("textInputOnDragEnter")
    console.log(e.dataTransfer.types);

    fetchHTMLImage(e.dataTransfer.getData("text/html"));
  }
  let onPaste = (e: React.ClipboardEvent)=>{
    console.log(e.clipboardData.types)

    if(!e.clipboardData.types.includes('text/plain'))
    {
      if(e.clipboardData.types.includes('text/html')){
        fetchHTMLImage(e.clipboardData.getData('text/html'));
      }
  
      e.preventDefault();
    }


  }

  return (
    <>
        <textarea id="inputTextMathEquation" 
                  placeholder="equation location"
                  onChange={textUpdated}
                  value={state.EquationProps.text}
                  onDragEnter={onDragEnter}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onPaste={onPaste}>

        </textarea>
    </>
  );
};

export default MathTextInput;