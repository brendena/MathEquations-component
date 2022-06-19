


/*
convert the canvas to a blob

There is a toDataURL, so i could use that to make a png.
But then it would be in base64.  So i would have to convert it from there
*/
async function  convertCanvasToBlob(canvas : HTMLCanvasElement ){
    return new Promise(resolve  =>{ 
      canvas.toBlob((blob :any)=>{resolve(blob);}); //converts it to png
    });
  }
  
  
async function convertCanvasToPNG_Uint8(canvas : HTMLCanvasElement)
{
    //get canvas into png and into Uint8Array
    let blobb :any = await convertCanvasToBlob(canvas);
    const blobArray = await blobb.arrayBuffer();
    const blob8 = new Uint8Array(blobArray);
    return blob8;
}

function convertUint8ToPNGBlob(array : Uint8Array)
{
    return new Blob([array],{type: "image/png"}); //converts it to base64
}

//https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string
const convert_blobToBase64String = async (blob:Blob) =>  {
  const base64url = await new Promise((r) => {
      const reader = new FileReader()
      reader.onload = () => r(reader.result)
      reader.readAsDataURL(blob);
  })
  return base64url;
}


export {
  convertCanvasToBlob,
  convertUint8ToPNGBlob,
  convertCanvasToPNG_Uint8,
  convert_blobToBase64String
}