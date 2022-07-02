import React, {useRef, useState} from 'react';
import {Canvg} from "canvg"
import * as pngMeta from "@nashiinc/png-metadata/index.js"
import {convertUint8ToPNGBlob,convertCanvasToPNG_Uint8,convert_blobToBase64String} from "../library/convert"
import { AppContext } from "../context";

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





function drawMathJaxToCanvas(mathJax :HTMLDivElement, canvas : HTMLCanvasElement, height:number, color : string )
{


    let svgCon = mathJax.getElementsByTagName('mjx-container')[0];
    let removeElement = svgCon.getElementsByTagName("mjx-assistive-mml");
    if(removeElement.length === 1) svgCon.removeChild(removeElement[0]);


    let ctx = canvas.getContext('2d');
    let svgData = svgCon.firstChild?.cloneNode(true);
    if(svgData != null && ctx != null)
    {
      let svg :any = svgData;
      svg.style.color= color;
      let widthSVG : number = svg.width.animVal.valueInSpecifiedUnits
      let heightSVG : number = svg.height.animVal.valueInSpecifiedUnits 
      let ratioSvg = widthSVG/heightSVG;
      
      svg.setAttribute("width",(height * ratioSvg) + "px");
      svg.setAttribute("height",height + "px");


      //this function below will resize the canvase to the svg's width and height
      let v = Canvg.fromString(ctx,svg.outerHTML)
      v.start();
    }
}


async function convertMathJaxToPNG_Blob(mathJax :HTMLDivElement, canvas : HTMLCanvasElement, height : number, color : string )
{
  drawMathJaxToCanvas(mathJax,canvas,height, color);
  let pngImage = await convertCanvasToPNG_Uint8(canvas);
  
  if(pngImage.length == 0)
  {
    throw "image wasen't created"
  }

  //get the metadata then 
  let metaData = pngMeta.readMetadata(pngImage)
  metaData["tEXt"] = {"test":"shit"}
  let pngU8 = pngMeta.writeMetadata(pngImage,metaData);
  
  return convertUint8ToPNGBlob(pngU8);
} 




export function useMathJaxImage()
{
    const { state  } = React.useContext(AppContext);
    let mathJaxConRef = useRef<HTMLDivElement>(null);
    let canvasRef = useRef<HTMLCanvasElement>(null);
    const [image,setImage] = useState("");

    const height = state.EquationProps.height;
    const color = state.EquationProps.color;
    const customCopyEvent = state.pageProps.copyCustomEvent; 
    
    async function addCanvasToClipboard()
    {
        if(mathJaxConRef?.current && canvasRef?.current){
            const blob = await convertMathJaxToPNG_Blob(mathJaxConRef.current, canvasRef.current, height, color);
            if(customCopyEvent)
            {
              const event = new CustomEvent('math-equation-gen-image', {
                bubbles: true,
                cancelable: false,
                composed: true,
                detail : {
                  "blob":blob,
                  "equationProps": state.EquationProps
                }
              });
              mathJaxConRef.current.dispatchEvent(event);   
              console.log("sent event")
            }
            else{
              let clipboard :any = navigator.clipboard;
              clipboard.write([
                new ClipboardItem({
                  "image/png": blob
                })
              ]);
            }

        }
    }

    //
    async function onMouseDown(event : React.MouseEvent){
      if(mathJaxConRef?.current && canvasRef?.current){
        const blob = await convertMathJaxToPNG_Blob(mathJaxConRef.current, canvasRef.current, height, color);
        let test  = await convert_blobToBase64String(blob) as string;
        console.log(test)
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