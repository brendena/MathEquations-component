import React, {useRef, useState} from 'react';
import {Canvg} from "canvg"
import * as pngMeta from "@nashiinc/png-metadata/index.js"
import * as base64 from "base-64";

//need these becuase the version of typescript used here is fairly old
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


  //https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string
const base64_arraybuffer = async (blob:Blob) =>  {
    const base64url = await new Promise((r) => {
      const reader = new FileReader()
      reader.onload = () => r(reader.result)
      reader.readAsDataURL(blob);
  })

    return base64url;
}


function drawMathJaxToCanvas(mathJax :HTMLDivElement, canvas : HTMLCanvasElement )
{
    let svgCon = mathJax.getElementsByTagName('mjx-container')[0];
    let removeElement = svgCon.getElementsByTagName("mjx-assistive-mml");
    if(removeElement.length === 1) svgCon.removeChild(removeElement[0]);
    let svgData = svgCon.innerHTML;

    let ctx = canvas.getContext('2d');
    if(ctx)
    {
        let v = Canvg.fromString(ctx,svgData)
        v.start();
    }
}

async function  convertCanvasToPng(canvas : HTMLCanvasElement ){
    return new Promise(resolve  =>{ 
      canvas.toBlob((blob :any)=>{resolve(blob);}); //converts it to png
    });
  }

async function generatePNG(mathJax :HTMLDivElement, canvas : HTMLCanvasElement )
{
    drawMathJaxToCanvas(mathJax,canvas);

    //get canvas into png and into Uint8Array
    let blobb :any = await convertCanvasToPng(canvas);
    const blobArray = await blobb.arrayBuffer();
    const blob8 = new Uint8Array(blobArray);

    //get the metadata then 
    let metaData = pngMeta.readMetadata(blob8)
    metaData["tEXt"] = {"test":"shit"}
    let newBlob = pngMeta.writeMetadata(blob8,metaData); //in uint8

    const backToBlob = new Blob([newBlob],{type: "image/png"}); //converts it to base64
    return backToBlob;
}




export function useMathJaxImage()
{
    let mathJaxConRef = useRef<HTMLDivElement>(null);
    let canvasRef = useRef<HTMLCanvasElement>(null);
    const [image,setImage] = useState("");

    
    async function addCanvasToClipboard()
    {
        if(mathJaxConRef?.current && canvasRef?.current){
            const blob = await generatePNG(mathJaxConRef.current, canvasRef.current);
            
            let clipboard :any = navigator.clipboard;
            clipboard.write([
              new ClipboardItem({
                "image/png": blob
              })
            ]);   
        }
    }

    //
    async function onMouseDown(event : React.MouseEvent){
      if(mathJaxConRef?.current && canvasRef?.current){
        const blob = await generatePNG(mathJaxConRef.current, canvasRef.current);
        let test  = await base64_arraybuffer(blob) as string;
        setImage(test);
      }
    }

    //onDrag can't be async
    function onDrag(event : React.DragEvent<HTMLDivElement>) {
      const d = new Date(); //this seems to slow it down so i can use it 
      var imageDiv = document.createElement("img");
      imageDiv.src = image;
      var wrapper = document.createElement("div");
      wrapper.appendChild(imageDiv);
      event.dataTransfer.setData("text/html",wrapper.innerHTML.toString());
      event.dataTransfer.setDragImage(imageDiv, 0,0)
    
    }

    

    return {
        mathJaxConRef: mathJaxConRef,
        canvasRef: canvasRef,
        addCanvasToClipboard: addCanvasToClipboard,
        onDrag: onDrag,
        onMouseDown: onMouseDown
    };
}