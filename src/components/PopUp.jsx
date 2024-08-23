import React, { useContext, useRef } from 'react'
import PopupContext from '../context/PopupContext';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AskNameForGuest from '../pages/AskNameForGuest';
import SettingsPage from '../pages/SettingsPage';
import AskRoomCode from './AskRoomCode';
import UserProfile from '../pages/UserProfile';
export default function PopUp(){

    const {isVisible, HidePopUp, page } = useContext(PopupContext)

    const bg = useRef();

    const hmap = {
        "login": <LoginPage />,
        "register": <RegisterPage />,
        "askName": <AskNameForGuest/>,
        "settings":<SettingsPage/>,
        "askRoomCode": <AskRoomCode/>,
        "user":<UserProfile/>
    }
 
    const handleHiding = (e)=>{
        if(e.target === bg.current) HidePopUp(); 
    };

    return (
        <div ref={bg} onClick={handleHiding} className={ isVisible ? 'absolute top-0 left-0 right-0 bottom-0 bg-black/20 flex items-center justify-center backdrop-blur-[2px] px-8':"hidden"}>
            <div className='content-wrapper bg-accent shadow-lg rounded-md relative w-full'>
                <div className="absolute right-1 top-1">
                    <button  onClick={()=>HidePopUp()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-error">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>

                <div className='content px-5 py-10'>
                    { hmap[page] }
                </div>
            </div>
        </div>

    )
}
