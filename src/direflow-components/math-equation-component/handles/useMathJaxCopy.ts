import React, {useContext} from 'react';
import { EventContext } from 'direflow-component';
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



export function useMathJaxCopy(createBlob:()=>Promise<Blob>)
{
    const webComponentDispatch = useContext(EventContext);
    const { state  } = React.useContext(AppContext);

    const customCopyEvent = state.pageProps.copyCustomEvent; 
    
    async function addCanvasToClipboard()
    {
      const blob = await createBlob();
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
        webComponentDispatch(event);   
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

    

    return  addCanvasToClipboard;
}