import React,{useState} from 'react'
import GameContext from './GameContext';

export default function GameContextProvider({children}) {
    const [musicVol, setMusicVol] = useState(0);
    const [musicPlay, setMusciPlay] = useState(false);
    const [TouchmusicVol, setTouchMusicVol] = useState(0);
    const [prompt, setPrompt] = useState("-------");
    const [guestName, setGuestName] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [Life, setLife] = useState(3);

    const context = {
        musicVol,       setMusicVol,
        TouchmusicVol,  setTouchMusicVol,
        musicPlay,      setMusciPlay,
        prompt,         setPrompt,
        guestName,      setGuestName,
        gameOver, setGameOver,
        Life, setLife,
    }
  return (
    <>
        <GameContext.Provider value={context}>
            {children}
        </GameContext.Provider>
    </>
  )
}
