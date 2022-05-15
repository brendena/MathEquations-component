import React, {useRef} from 'react';
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import { AppContext } from "../context";
import {Canvg} from "canvg"
import * as pngMeta from "@nashiinc/png-metadata/index.js"


interface ClipboardItem {
  readonly types: string[];
  readonly presentationStyle: "unspecified" | "inline" | "attachment";
  getType(): Promise<Blob>;
}

interface ClipboardItemData {
  [mimeType: string]: any;
}

declare var ClipboardItem: {
  prototype: ClipboardItem;
  new (itemData: ClipboardItemData): ClipboardItem;
};

const MathJaxViewer: React.FC = () => {
  const { state  } = React.useContext(AppContext);
  let ref = useRef(null);
  let canvasRef = useRef(null);


  const error = (err:any) =>{ console.log("############Error"); console.log(err)}


  const  imageChanged =  ()=>{
    let refTmp :any = ref.current;

    if(refTmp != null)
    {
      let svgData = refTmp.getElementsByTagName('mjx-container')[0];
      svgData.removeChild(svgData.getElementsByTagName("mjx-assistive-mml")[0]);
      svgData = svgData.innerHTML;


      let canvas = refTmp.getElementsByTagName('canvas')[0];
      let ctx = canvas.getContext('2d');

      let v = Canvg.fromString(ctx,svgData)
      v.start();
      

    }
  }

  let addClipBoard = async ()=>{
    //navigator.clipboard.writeText('This text is now in the clipboard');
    let canvas :any = canvasRef.current 
    if(canvas != null)
    {
      let test :any = navigator.clipboard;
      const canvasWait = async ()=>{
        return new Promise(resolve  =>{ 
          canvas.toBlob((blob :any)=>{resolve(blob);}); //converts it to png
        });
      }

      //get canvas into png and into Uint8Array
      let blobb :any = await canvasWait();
      const blobArray = await blobb.arrayBuffer();
      const blob8 = new Uint8Array(blobArray);

      //get the metadata then 
      let metaData = pngMeta.readMetadata(blob8)
      metaData["tEXt"] = {"test":"shit"}
      let newBlob = pngMeta.writeMetadata(blob8,metaData);
      
      //add to clipboard
      const backToBlob = new Blob([newBlob],{type: "image/png"});
      test.write([
        new ClipboardItem({
          "image/png": backToBlob
        })
      ]); 
    }    
  }

  let dragStart= (event : React.DragEvent<HTMLDivElement> )=>{
    console.log("drag started");
    event.dataTransfer.setData("text", "testing this out");
  }

  let text = state.EquationProps.text; 
  if(text === "") text=" ";
  return (
    <div id="mathJaxViewer" ref={ref} draggable={true} onDragStart={dragStart}>

        <MathJaxContext   renderMode={"pre"} version={3} onError={error} src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-svg.js" >
            <MathJax typesettingOptions={{fn:"tex2svg"}} text={text} dynamic={true} inline onTypeset={imageChanged}> </MathJax>
       </MathJaxContext>
        <p>test~~~~~~~~~~~~~~~~</p>

        <canvas ref={canvasRef}>

        </canvas>

        <button onClick={addClipBoard}>
test copy
        </button>
    </div>
  );
};


export default MathJaxViewer;