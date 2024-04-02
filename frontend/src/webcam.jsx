import Webcam from "react-webcam";
import { useRef , useState, useCallback} from "react";
function CustomWebcam (){

    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    const retake = () => {
        setImgSrc(null);
      };

    //dk function to capture 
    const capture = useCallback(() => {
        
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        console.log(imageSrc);
      }, [webcamRef]);
    return (
        
      <div>
        <div className="container d-flex justify-content-center">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam height={300} width={300} ref={webcamRef} screenshotFormat="image/jpeg"
        screenshotQuality={0.8}/>
      )}</div>
      <div className="btn-container">
        {imgSrc ? (<button className="p-2 m-2" onClick={retake}>Retake photo</button>):

<button onClick={capture}>Capture photo</button>
        }
        
      </div>
      </div>
    
    );
  };
  
  export default CustomWebcam;