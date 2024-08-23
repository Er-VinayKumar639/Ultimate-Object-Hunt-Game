import React, { useContext } from 'react'
import GameContext from '../context/GameContext'

export default function SettingsPage() {
  const {musicVol,setMusicVol, TouchmusicVol, setTouchMusicVol, musicPlay,setMusciPlay} = useContext(GameContext)
  return (
    <div className='flex flex-col gap-8 text-black '>

        <h1 className='text-4xl font-extrabold font-bungee'>Settings</h1>

        <div>
          <p className='font-bold'>Music Volume</p>
          <input type="range" min={0} max={100} value={musicVol} onChange={(e)=> setMusicVol(e.target.value)} className="range" step={25} />
          <div className="flex w-full justify-between px-2 text-xs">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
        </div>

        <div>
          <p className='font-bold'>Touch Sounds</p>
          <input type="range" min={0} max="100" value={TouchmusicVol} onChange={(e)=> setTouchMusicVol(e.target.value)} className="range" step="25" />
          <div className="flex w-full justify-between px-2 text-xs">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
        </div>

        <div>
          <button className={musicPlay ? 'btn btn-circle btn-primary': "btn btn-circle" } onClick={()=>setMusciPlay(!musicPlay)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
            </svg>
          </button>
        </div>
      
    </div>

  )
}
