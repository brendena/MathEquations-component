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
    console.log(data)
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
    }
  }
  let onPaste = (e: React.ClipboardEvent)=>{
    let test =e.clipboardData.getData('text');
    let html =e.clipboardData.getData('text/html');
    let files =e.clipboardData.getData('Files');
    let image =e.clipboardData.getData("image/png")
    console.log(test);
    console.log(e.clipboardData.types)
    console.log(image)
    console.log(html);
    console.log(files)

    fetch("https://lh3.googleusercontent.com/vzMrcE4h69s8gMsHAYrqo3aDd63Q8U8O7DEH3WedfEMnvOVX3Bne7pc2PxBviZ8Ln8861m0WJLB-Z0_6zMu57JOGPGJ5-fFvdw-SSIRqZkACuN5xNaWGeWz40o3euTPLpCOrLYHeWSF0hF1sZ8o").then((response)=>{
      response.blob().then((blob)=>{
        blob.arrayBuffer().then((blobArray)=>{
          const blob8 = new Uint8Array(blobArray);
          let metaData = pngMeta.readMetadata(new Uint8Array(blob8));
          console.log(metaData)
        });
        
      });
    }); 

    e.preventDefault();
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