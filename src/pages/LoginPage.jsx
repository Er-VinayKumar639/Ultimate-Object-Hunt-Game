import React,{useContext, useState} from 'react'
import PopupContext from '../context/PopupContext'
import AuthContext from '../context/AuthContext'

export default function LoginPage() {
  const {ShowPopUp, HidePopUp} = useContext(PopupContext)
  const {login} = useContext(AuthContext)
  const [formdata, setFormData] = useState({
    username:"",
    password:"",
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(await login(formdata.username, formdata.password)){HidePopUp()};
  }

  return (
      <form className='flex flex-col gap-4 text-black' onSubmit={handleSubmit}>
        <div>
          <h1 className='text-4xl font-extrabold font-bungee'>Login</h1>
          <p>Login to play online with your friends.</p>
        </div>
        

        <div>
          <span>Your Email</span>
          <input
            value={formdata.username}
            onChange={(e)=> setFormData({...formdata, username:e.target.value}) } 
            type="text"
            className="input input-bordered bg-transparent w-full " required/>
        </div>

        <div>
          <span>Your Passoword</span>
          <input
            value={formdata.password}
            onChange={(e)=> setFormData({...formdata, password:e.target.value}) } 
            type="password"
            className="input input-bordered bg-transparent w-full " required/>
        </div>

        <button type='submit' className='btn btn-primary font-bold text-lg tracking-wider'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>

          Submit
        </button>

        <div className="divider">OR</div>
        <button type='button' onClick={()=>ShowPopUp("register")} className='btn btn-md btn-outline text-lg tracking-wider'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          Register
        </button>

      </form>

  )
}