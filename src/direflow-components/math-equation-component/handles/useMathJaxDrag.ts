import React, {useRef, useState} from 'react';
import {convert_blobToBase64String} from "../library/convert"





export function useMathJaxDrag(createBlob:()=>Promise<Blob>)
{

    let mathJaxConRef = useRef<HTMLDivElement>(null);
    let canvasRef = useRef<HTMLCanvasElement>(null);
    const [image,setImage] = useState("");


    //
    async function onMouseDown(event : React.MouseEvent){
        const blob = await createBlob();
        let imageBlob  = await convert_blobToBase64String(blob) as string;
        setImage(imageBlob);
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

    

    return [onDrag,onMouseDown];
}