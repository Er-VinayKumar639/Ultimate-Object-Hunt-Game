import axios from "axios";
import { useState, useContext } from "react";
import GameContext from "../context/GameContext";
import Webcam from "react-webcam";
import AuthContext from "../context/AuthContext";



const videoConstraints = {
    width: 350,
    height: 350,
    facingMode: "user",
};



const WebcamComponent =  ({submitData, handleCapture, setImageData, ImageData}) => {



 return(
    <div className='relative w-full flex items-center justify-center flex-col gap-2 grow shrink-0'>
            <Webcam screenshotFormat="image/jpeg" videoConstraints={videoConstraints}>
                {({ getScreenshot }) => (
                    <button onClick={()=>handleCapture(getScreenshot)} className='btn btn-primary btn-wide'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                        </svg>
                        Capture
                    </button>
                )}
            </Webcam>
            { ImageData && (
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center gap-2 justify-center flex-col'>
                    <div className='relative'> 
                        <img src={ImageData} alt='' />

                        <div className='flex gap-4 justify-center absolute top-0 left-0 bottom-0 right-0 items-center'>
                            <button className='btn btn-accent' onClick={submitData}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                                Submit
                            </button>
                            <button onClick={()=>setImageData(null)} className='btn btn-base-100'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                                Retake    
                            </button>                        
                        </div>
                    </div>
                    
                </div>
            )}
    </div>
    );
}


export {WebcamComponent}