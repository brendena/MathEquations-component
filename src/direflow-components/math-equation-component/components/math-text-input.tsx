import React, {DragEvent} from 'react';
import { AppContext } from "../context";
import { Types } from "../reducers";
import * as pngMeta from "@nashiinc/png-metadata/index.js"

const MathTextInput: React.FC = () => {
  const { state ,dispatch } = React.useContext(AppContext);

  const textUpdated = (e : React.ChangeEvent<HTMLTextAreaElement>)=>{
    dispatch({type:Types.EQUATION_CHANGED, payload:e.currentTarget.value})
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
    let data = e.dataTransfer.getData("text/html");
    let el = document.createElement( 'html' );
    el.innerHTML = data;
    let imgList = el.getElementsByTagName("img");
    if(imgList.length > 0)
    {
      let img = imgList[0];
      let data = img.src.split("base64,");
      fetch("data:application/octet;base64," + data[1]).then(
        (converted)=>{
          converted.arrayBuffer().then((buff)=>{
            let metaData = pngMeta.readMetadata(new Uint8Array(buff));
            console.log(metaData)
          })
        }
      )
      
      //.arrayBuffer()


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
                  onDrop={onDrop}>

        </textarea>
    </>
  );
};

export default MathTextInput;