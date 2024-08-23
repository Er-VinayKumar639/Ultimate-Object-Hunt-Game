import React, { useContext } from 'react'
import logo from '../assets/lo.png';
import Footer from '../components/Footer';
import PopUpContext from '../context/PopupContext';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function HomePage() {
  const {ShowPopUp} = useContext(PopUpContext);
  const {user} = useContext(AuthContext);

  return (
    <div className='bg-black/20 h-full flex flex-col justify-evenly items-center'>

      <div className='flex flex-col justify-evenly items-center'>
        <img src={logo} alt='Object Hunt Logo' className='logo w-42' />
        <h1 className='text-4xl font-extrabold font-bungee text-black'>OBJECT HUNT</h1>
      </div>
      <div className='flex flex-col gap-4'>
        {
          user ? (
            <>
              <Link to="/play">
                  <button  className='btn btn-wide btn-primary font-bold text-lg tracking-wider	'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
                    PLAY NOW
                  </button>
              </Link>
              
              <button onClick={()=>ShowPopUp("user")} className='btn btn-wide btn-accent font-bold text-lg tracking-wider'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  Profile
              </button>
            </>

          ) :(
            <button onClick={()=>ShowPopUp("login")} className='btn btn-wide btn-accent font-bold text-lg tracking-wider'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              Login
           </button>
          )
        }

        <div className='divider'>Learn how to play</div>

        <button className='btn btn-wide btn-error text-white font-medium text-lg tracking-wider	'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
          </svg>
          HOW TO PLAY
        </button>
      
      </div>
      
      <Footer />
      
    </div>
  )
}
