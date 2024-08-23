import React, { useContext } from 'react'
import GameContext from '../context/GameContext'

export default function AskNameForGuest() {
  const { guestName,setGuestName} = useContext(GameContext);
  const handleGuestSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/game/?mode=guest";
  }
  return (
    <form className='flex flex-col gap-4 text-black' onSubmit={handleGuestSubmit}>
        <div>
            <h1 className='text-3xl font-bold font-bungee'>GUEST MODE</h1>
            <p>To play multiplayer online with your friends you need to login first.</p>
        </div>

        <div>
            <span>Your Name</span>
            <input value={guestName} onChange={(e)=> setGuestName(e.target.value)} type="text" className="input input-bordered input-seconadary bg-transparent w-full " required/>
        </div>

        <button className='btn btn-primary font-bold text-lg tracking-wider	'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
          </svg>
          START
        </button>
    </form>
  )
}
