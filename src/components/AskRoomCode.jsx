import React, { useRef } from 'react'

export default function AskRoomCode() {
  const room_code = useRef()
  const joinRoom = (e)=> {
    e.preventDefault();
    window.location.href = `/game/${room_code.current.value}/`
  }
  return (
    <form className='flex flex-col gap-4 text-black ' onSubmit={joinRoom}>
        <div>
            <h1 className='text-3xl font-bold font-bungee'>Join Room</h1>
            <p>Enter room code to join.</p>
        </div>

        <div>
            <span>Room Code</span>
            <input type="text" ref={room_code} minLength={6} maxLength={6} className="input input-bordered input-seconadary bg-transparent w-full tracking-[1rem] font-bold text-xl text-center" placeholder='------' required/>
        </div>

        <button type='submit' className='btn btn-primary font-bold text-lg tracking-wider	'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
          </svg>
          Join
        </button>
    </form>
  )
}
