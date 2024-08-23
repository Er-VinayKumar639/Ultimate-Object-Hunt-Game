import {Outlet} from "react-router-dom";
import PopUp from "./components/PopUp";
import SettingsButton from "./components/SettingsButton";
import Loader from "./components/Loader";
import { useContext, useEffect, useRef } from "react";
import GameContext from "./context/GameContext";

import bgAudio from './assets/gameaudio.mp3';
import AuthContext from "./context/AuthContext";

export const Layout = () => {
    const { musicVol, musicPlay} = useContext(GameContext)
    const {loading, error} = useContext(AuthContext);
    
    const audio = useRef()
    audio.current?.setAttribute('loop', true)
    audio.current?.setAttribute('autoplay', true)
    audio.current?.setAttribute('muted', true)


    useEffect(() =>{
        if(musicPlay){
            audio.current.volume = musicVol/100;
            audio.current?.play();
            
        }else{
            audio.current?.pause();
        }
    }, [audio, musicPlay, musicVol])

    return (
        <div className="relative h-screen w-full sm:max-w-md mx-auto main-app">
            <Outlet />
        

            {/* opop */}
            <PopUp/>
            <SettingsButton/>
            { (loading || error) && <Loader/> }
            <audio src={bgAudio} ref={audio} hidden></audio>
        </div>
    )
}
