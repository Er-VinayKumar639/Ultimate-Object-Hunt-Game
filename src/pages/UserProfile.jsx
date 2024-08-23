import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function UserProfile() {
    const {user, logout} = useContext(AuthContext)

    if(!user) {
        return <><p className='text-black'>Loading...</p></>
    }
  return (
    <div className='flex flex-col gap-4 text-black'>
        <div>
          <h1 className='text-4xl font-extrabold font-bungee'>Profile</h1>
          <p>Hello {user.name}!!</p>
        </div>
        
        <div>
          <span>Name</span>
          <input
          readOnly
            value={user.name}
            type="text"
            className="input input-bordered bg-transparent w-full " required/>
        </div>

        <div>
          <span>Email</span>
          <input
          readOnly
            value={user.username}
            type="text"
            className="input input-bordered bg-transparent w-full " required/>
        </div>

        <button type='button' onClick={logout} className='btn btn-md btn-error font-bold text-lg tracking-wider'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          Logout
        </button>

      </div>

  )
}
