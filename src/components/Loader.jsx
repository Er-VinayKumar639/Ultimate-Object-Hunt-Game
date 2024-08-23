import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function Loader() {
  const {error, setError} = useContext(AuthContext)


  return (
    <>
        <div className="absolute top-0 left-0 right-0 bottom-0 z-[9999999] bg-black/70 flex-col gap-4 w-full flex items-center justify-center">
            { error ? (
              <>
                <div className="card bg-slate-800 text-neutral-content w-96">
                  <div className="card-body items-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16 text-error">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                    <p className='text-lg font-medium'>{error}</p>
                    <div className="card-actions justify-end">
                      <button onClick={()=>setError("")} className="btn btn-primary">Okay</button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                    <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                </div>
                <p className='text-xl font-bungee text-white'>Loading...</p>
              </>
            )}
        </div>
    </>
  )
}
