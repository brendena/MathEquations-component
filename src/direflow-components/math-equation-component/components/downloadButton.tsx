import React from 'react';
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { saveAs } from 'file-saver';
interface DownloadButtonPrpos
{
  generateImage: () => Promise<Blob>
};

const DownloadButton: React.FC<DownloadButtonPrpos> = (prop) => {
    let  onclick= async ()=>{
        //showSaveFilePicker 
        //only available on chrome chrome.  Not even on brave
        let blob = await prop.generateImage();
        saveAs(blob, "savedEquation.png");
    }
  return (
    <button className={' toolbarIcons removeStyles'} onClick={()=>{onclick();}}>
      <FontAwesomeIcon icon={faDownload}  style={{width:'20px'}}/>
    </button>

);
};


export default DownloadButton;