import React,{useState, useContext, useEffect, useRef} from 'react'
import GameContext from '../context/GameContext';
import AuthContext from '../context/AuthContext';
import {WebcamComponent} from '../components/WebCam';
import promptData from '../assets/promptData';
import Axios from '../utils/axios';
import Confetti from 'react-confetti'
import { Link } from 'react-router-dom';

export default function SoloGamePlay() {
    const {user, setError} = useContext(AuthContext)
    const {prompt,setPrompt, gameOver, setGameOver, Life, setLife} = useContext(GameContext);
    const [score, setScore] = useState(0);
    const [Highscore, setHighScore] = useState(0);
    const [Counting, setCouting] = useState(0);
    const play = useRef(false);


    const {setLoading} = useContext(AuthContext);
    const [img, setImageData] = useState(null)

    const [counter, setCounter] = useState(null )

    const handleCapture = async (getScreenshot) => {
        setImageData(getScreenshot());
    }

    const IncreaseScore = async (s) => {
        let newScore = score + Math.floor(s/(30-Counting))

        console.log("new score: " + newScore, "high score: " + Highscore)

        if(newScore > Highscore){
            console.log("high score upated to " + newScore)
            setHighScore(newScore)
        }
        setScore(newScore)
    }

    const submitData = async () =>{
        console.log(counter)
        clearInterval(counter)

        setLoading(()=>true)
            try{
                const axios = new Axios()
                var res = await axios.agent.post(
                    "/image/",
                    {
                        prompt: prompt,
                        image: img
                    }
                )
                if(res.data.answer === true){
                    IncreaseScore(150);
                    setImageData(null)
                    setCounter(Timer(30))

                }else{
                    setLife(c=>c-1)
                    if(Life <=1){
                        setGameOver(true);
                    }else{
                        setError("Oops! That wasnt the object we were expecting!. Hunt for the next object.")
                        setCounter(Timer(30))
                    }
                    setImageData(null);
                }

            }catch(e){
                console.log(e)
            }
        setLoading(false);
    }


    function get_random(list){
        return list[Math.floor((Math.random()*list.length))];
    }

    const Timer = (sec)=> {
        setPrompt(get_random(promptData))
        setCouting(sec);
        let t = setInterval(()=>{
            sec--;
            setCouting(sec+1);   
            if (sec < 0) {
                setGameOver(true);
                clearInterval(t);
            }
        }, 1000)
        return t;
    }

    useEffect(()=>{
        console.log("first")
        const t = Timer(30)
        setCounter(t);

        return ()=>{
            clearInterval(t);
        }
    }, []);

    const playAgain = ()=>{
        setLife(3)
        setScore(0);
        setCounter(Timer(30));
        setGameOver(false);
    };

    const stopGame = ()=>{
        clearInterval(counter);
        setGameOver(true);
    }

    if(gameOver)return (
        <>
            <div className='text-black h-full gap-y-1 flex flex-col justify-evenly  items-center overflow-hidden relative'>
                <p className='text-5xl font-bungee font-extrabold'>Game Over</p>
                <div className='text-center'>
                    <p className='text-2xl font-bold'>Score</p>
                    <p className='text-7xl font-bungee font-extrabold'>{score}</p>
                </div>

                <div className='text-center'>
                    <p className='text-lg font-bold'>Highest Score</p>
                    <p className='text-5xl font-bungee font-extrabold'>{Highscore}</p>
                </div>
                <Confetti width={900} height={900} recycle={false}/>

                <div className='text-center'>
                    <button className='btn btn-wide mt-8 btn-outline' onClick={playAgain}>Play Again</button>
                    <Link to='/'>
                        <button className='btn btn-wide mt-8 btn-outline'>Return homepage</button>
                    </Link>
                </div>
            </div>
        </>
    )
  return (

    <div className='bg-accent/40 h-full gap-y-1 flex flex-col justify-start items-strech'>

        <div className='h-4/6 flex flex-col'>
            
            <div className='text-center p-2 bg-slate-800 flex justify-between items-center'>
                <p className='text-xl text-secondary font-semibold ms-2'>{user.name}</p>

                <p className='text-xl text-secondary font-semibold flex items-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-error">
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                    <span>{Life}</span>
                </p>

            </div>

            <div className='flex justify-between items-center p-4 bg-slate-800 rounded-b-lg'>

                <p className='text-xl'>Find a <span className='text-secondary font-semibold text-2xl block capitalize'>{prompt}</span></p>
                <div>
                    <span className="text-xl text-secondary font-semibold">
                        <span>{Counting}</span>
                    </span>
                    s left
                </div>
            </div>

            {
                // play.current 
                // ? 
                <WebcamComponent submitData={submitData} handleCapture={handleCapture} setImageData={setImageData} ImageData={img} /> 
                // :(<button className='btn btn-primary m-auto' onClick={startGame}>I'm Ready</button>)
            }

            
        </div>

        <div className='h-2/6  grid grid-cols-2 rounded-t-lg bg-slate-800 p-2'>

            <div className='flex flex-col items-center justify-center gap-2'>
                <p className='font-bungee text-5xl'>{score}</p>
                <h1 className='text-xl font-bold'>Your Score</h1>
            </div>

            <div className='flex flex-col items-center justify-center gap-2'>
                <p className='font-bungee text-5xl'>{Highscore}</p>
                <h1 className='text-xl font-bold'>Highest Score</h1>
            </div>

            <div className={play ? 'col-span-2 text-center' : 'col-span-2 text-center opacity-0'}>
                <button className='btn btn-error btn-outline btn-wide' onClick={stopGame}>Exit</button>
            </div>


        </div>
    

    </div>
  )
}
