import React, {useRef} from 'react';
import {Canvg} from "canvg"
import * as pngMeta from "@nashiinc/png-metadata/index.js"
import {convertUint8ToPNGBlob,convertCanvasToPNG_Uint8} from "../library/convert"
import { AppContext } from "../context";
import { useMathJaxCopy }  from "./useMathJaxCopy"
import { useMathJaxDrag } from "./useMathJaxDrag"
import { EquationProps } from '../reducers';


function drawMathJaxToCanvas(mathJax :HTMLDivElement, canvas : HTMLCanvasElement, height:number, width:number, lockedHeight:boolean, lockedWidth:boolean, color : string )
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
      
      
      if(!lockedWidth){
        width = height * (widthSVG/heightSVG);
      }
      else if(!lockedHeight){
        height = width *  (heightSVG/widthSVG);
      }


      svg.setAttribute("width", width  + "px");
      svg.setAttribute("height",height + "px");


      //this function below will resize the canvase to the svg's width and height
      let v = Canvg.fromString(ctx,svg.outerHTML)
      v.start();
    }
}


async function convertCanvasToPNG_Blob(canvas : HTMLCanvasElement, equationProps : EquationProps)
{
  let pngImage = await convertCanvasToPNG_Uint8(canvas);
  
  if(pngImage.length === 0)
  {
    throw Error("image wasen't created");
  }

  //get the metadata then 
  let metaData = pngMeta.readMetadata(pngImage)
  metaData["tEXt"] = equationProps;
  let pngU8 = pngMeta.writeMetadata(pngImage,metaData);
  
  return convertUint8ToPNGBlob(pngU8);
} 




export function useMathJaxImage()
{
    const { state  } = React.useContext(AppContext);
    let mathJaxConRef = useRef<HTMLDivElement>(null);
    let canvasRef = useRef<HTMLCanvasElement>(null);

    const color  = state.EquationProps.color;
    const height = state.EquationProps.height;
    const width  = state.EquationProps.width;
    const lockedHeight = state.EquationProps.lockHeight;
    const lockedWidth  = state.EquationProps.lockWidth;

    let createMaxJaxImage = async ()=>{
      if(mathJaxConRef?.current && canvasRef?.current)
      {
        drawMathJaxToCanvas(mathJaxConRef.current, canvasRef.current, height, width, lockedHeight,lockedWidth, color);
        const blob = await convertCanvasToPNG_Blob(canvasRef.current,state.EquationProps);
        return blob;
      }

      console.log("noooo")
      throw Error("the reference wasen't defined");
    }


    const addCanvasToClipboard =  useMathJaxCopy(createMaxJaxImage);
    const [onDrag, onMouseDown] = useMathJaxDrag(createMaxJaxImage);



    

    return {
        mathJaxConRef: mathJaxConRef,
        canvasRef: canvasRef,
        addCanvasToClipboard: addCanvasToClipboard,
        onDrag: onDrag,
        onMouseDown: onMouseDown,
        createMaxJaxImage: createMaxJaxImage
    };
}