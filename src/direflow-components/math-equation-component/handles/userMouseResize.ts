import React from 'react';

import { AppContext } from "../context";

import * as Enums from "../conts/enums"



export function useMouseMove(ref: React.MutableRefObject<null>, spacer: React.MutableRefObject<null>)
{
  const { state  } = React.useContext(AppContext);

  const mouseMove = (pos : MouseEvent)=>{
    let current : any = ref.current
    let appSpacer :any = spacer.current;
    if(current  != null)
    {
      appSpacer.style.pointerEvents = "auto";

      let widthOrHeight = 0;
      let addAmount = 0;
      
      if(state.pageProps.orientation === Enums.ORIENTATION.RIGHT){
        widthOrHeight = document.documentElement.clientWidth;
        addAmount =  - pos.clientX;
      }
      else{
        widthOrHeight = document.documentElement.clientHeight;
        addAmount =  - pos.clientY;
      }
        
      current.style.setProperty('--length-ui', (widthOrHeight + addAmount) + "px");
    }
  }
  const mouseResizeStart = ()=>{
    document.body.addEventListener("mousemove", mouseMove)
    document.body.addEventListener("mouseup", ()=>{
      document.body.removeEventListener("mousemove",mouseMove,false);
      let appSpacer :any = spacer.current;
      if(appSpacer){
        appSpacer.style.pointerEvents = "none";
      }
    }, {"once": true});
  }
  
  return{mouseResizeStart};
}