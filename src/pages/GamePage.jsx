import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import GameContext from '../context/GameContext';
import {  useParams } from 'react-router-dom';
import {WebcamComponent} from '../components/WebCam';
import AuthContext from '../context/AuthContext';
import Axios from '../utils/axios';
import promptData from '../assets/promptData'
import { Link } from 'react-router-dom';




function SendMessage({sendMessageSockt}){
    const input_ref = useRef()
    const n = ()=>{
        sendMessageSockt(input_ref.current.value);
        input_ref.current.value = ""
    }
    return (
        <div className='flex my-2 sticky top-0 left-0 right-0'>
            <input type="text" ref={input_ref}  className='input input-sm grow bg-accent/50 text-black font-medium' placeholder='message..' />
            <button className='btn btn-sm btn-ghost' onClick={n}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
            </button>
        </div>
    )
}



export default function GamePage() {
    const {user, setError, setLoading} = useContext(AuthContext);
    const {prompt,setPrompt, gameOver, setGameOver, Life, setLife} = useContext(GameContext)
    const [board, setBoard] = useState(false);
    const [matchStarted, setMatchStarted] = useState(false);
    const [matchEnded, setMatchEnded] = useState(false);
    
    const [JoinedUserList, setJoinedUserList] = useState([]);
    const msgContainer = useRef()
    const params = useParams();
    const Room  = useRef(params.roomcode)
    const copytext = useRef()


    const [interval, setIntvl] = useState();
    const [Counting, setCouting] = useState(0);
    const [score, setScore] = useState(0);
    
    const copy = (e)=>{
        copytext.current.textContent = "copied"
        setTimeout(()=>copytext.current.textContent = "copy" , 3000)
    }

    const [img, setImageData] = useState(null)
    const handleCapture = async (getScreenshot) => {
        setImageData(getScreenshot());
    }


    const socket = useMemo(()=> new WebSocket(`ws://localhost:8000/webs/${Room.current}/?user=${user.user_id}`), [user]);

    const StartMatch = () =>{
        if(JoinedUserList.length <= 1){
            setError("Seems you are alone in the room. Cant not start match.");
        }else{
            socket.send(JSON.stringify({
                type:"start",
            }));
        }
    }

    function get_random(list){
        return list[Math.floor((Math.random()*list.length))];
    }


    const updateLifeOnServer = useCallback(()=>{
        // decreses life by - 1
        socket.send(JSON.stringify({
            type:"updateLife",
        }));

    }, [socket]);
  
    const Timer = useCallback( (sec)=> {
        setPrompt(get_random(promptData));
        setCouting(sec);

        let t = setInterval(()=>{
            sec--;
            setCouting(sec+1);
            if (sec < 0) {
                clearInterval(t);
                setError("Oops! You ran out of time. Hunt for next object.");
                updateLifeOnServer();
                setLife(c=>c-1);
                setIntvl(Timer(30));
            }
        }, 1000)
        return t;

    } ,[setPrompt, updateLifeOnServer, setError, setLife] )

  

    const configUser =useCallback((this_user)=>{
        if(this_user.game_finished){
            setMatchEnded(true);
            return;
        }

        if(this_user.life <= 0 || this_user.game_over){
            setLife(0)
            setGameOver(true);
            clearInterval(interval)
        }else{
            setLife(this_user.life);
        }

        if(this_user.game_started && !matchStarted && !this_user.game_over){
            setError("Game has Started!")
            setMatchStarted(true);
            setIntvl(Timer(30));
        }
        setScore(this_user.score);
    

    }, [setGameOver, setLife, Timer, matchStarted, setError, interval])
    

    useEffect(()=>{

        // validate room code and rediirect to home page
        ;(async()=>{
            let axios =new Axios()
            let res = await axios.agent.get(`/room/validate/${Room.current}/`)
            if (!res.data.ok) setError("Invalid room code.")
        })();

        function socketMessage(e){
            let msg = JSON.parse(e.data).payload;

            if(msg.type === "chatMessage"){
                let d = document.createElement("div");
                d.innerHTML = `<p class='py-1 text-sm ps-12 '><span class='font-semibold text-accent'>${msg.data.name}</span> : ${msg.data.message}</p>`
                msgContainer.current?.appendChild(d)
            }else if(msg.type === "newJoin"){
                let this_user = msg.data.filter((a)=> a.user_id === user.user_id)
                configUser(this_user[0])
                setJoinedUserList(msg.data)
            }else if(msg.type === "start"){
                setError("Game has Started!")
                setMatchStarted(true);
                setIntvl(Timer(30));
            } else if(msg.type === "matchEnded"){
                clearInterval(interval);
                setMatchEnded(true);
            }
        }
        
        const socketOpens = (e)=>{
            socket.send(JSON.stringify({
                type: "chatMessage",
                data:{name:user.name, message:"Joined the match", username:user.username}
            }))
        }

                
        socket.addEventListener("open", socketOpens)
        socket.addEventListener("message", socketMessage)


        return ()=> {
            socket.removeEventListener("open", socketOpens);
            socket.removeEventListener("message", socketMessage);
            clearInterval(interval)
        }

    }, [Life, interval, user, socket, configUser, setError ,Timer]);

    const IncreaseScore = async (s) => {
        let newScore = score + Math.floor(s/(30-Counting))
        socket.send(JSON.stringify({
            type:"scoreUpdate",
            data:{"score":newScore}
        }));
    }


    const submitData = async () =>{
            clearInterval(interval)
            setLoading(()=>true)

            try{
                const axios = new Axios()
                var res = await axios.agent.post("/image/",
                    {
                        prompt: prompt,
                        image: img
                    }
                )
                setImageData(null);
                if(res.data.answer === true){
                    IncreaseScore(150);
                }else{
                    updateLifeOnServer();
                    setError("Oops! That wasnt the object we were expecting!. Hunt for the next object.")
                }
                
            }catch(e){
                setError("Error while posting.")
            }

            // start game
            setIntvl(Timer(30));
            setLoading(false);
    }
    
    const sendMessageSockt = (message) =>{
        socket.send(JSON.stringify({
            type:"chatMessage",
            data:{name:user.name, message:message, username:user.username}
        }));
    }

    if(matchEnded){
        return (
            <div className='text-black h-full gap-y-1 flex flex-col justify-evenly  items-strech px-8 overflow-hidden relative'>
                <p className='text-3xl font-bungee font-extrabold text-center'>Match has ended!</p>

                <div className=''>
                    <p className='text-2xl font-extrabold font-bungee text-center mb-4'>Score Board</p>
                    <table className="table bg-accent w-full">
                        <thead>
                            <tr className='text-black'>
                                <th className='font-bold text-md'>#</th>
                                <th className='font-bold text-md'>Name</th>
                                <th className='font-bold text-md'>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                JoinedUserList?.map((v,i)=>{return (
                                    <tr className="border-accent/20 hover:bg-accent/20" key={i}>
                                        <th className='font-bold text-lg'>
                                            {
                                                v.winner?.user_id=== v.user_id
                                                ?
                                                <svg className='size-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M21.8382 11.1263L21.609 13.5616C21.2313 17.5742 21.0425 19.5805 19.8599 20.7902C18.6773 22 16.9048 22 13.3599 22H10.6401C7.09517 22 5.32271 22 4.14009 20.7902C2.95748 19.5805 2.76865 17.5742 2.391 13.5616L2.16181 11.1263C1.9818 9.2137 1.8918 8.25739 2.21899 7.86207C2.39598 7.64823 2.63666 7.5172 2.89399 7.4946C3.36968 7.45282 3.96708 8.1329 5.16187 9.49307C5.77977 10.1965 6.08872 10.5482 6.43337 10.6027C6.62434 10.6328 6.81892 10.6018 6.99526 10.5131C7.31351 10.3529 7.5257 9.91812 7.95007 9.04852L10.1869 4.46486C10.9888 2.82162 11.3898 2 12 2C12.6102 2 13.0112 2.82162 13.8131 4.46485L16.0499 9.04851C16.4743 9.91812 16.6865 10.3529 17.0047 10.5131C17.1811 10.6018 17.3757 10.6328 17.5666 10.6027C17.9113 10.5482 18.2202 10.1965 18.8381 9.49307C20.0329 8.1329 20.6303 7.45282 21.106 7.4946C21.3633 7.5172 21.604 7.64823 21.781 7.86207C22.1082 8.25739 22.0182 9.2137 21.8382 11.1263ZM12.9524 12.699L12.8541 12.5227C12.4741 11.841 12.2841 11.5002 12 11.5002C11.7159 11.5002 11.5259 11.841 11.1459 12.5227L11.0476 12.699C10.9397 12.8927 10.8857 12.9896 10.8015 13.0535C10.7173 13.1174 10.6125 13.1411 10.4028 13.1886L10.2119 13.2318C9.47396 13.3987 9.10501 13.4822 9.01723 13.7645C8.92945 14.0468 9.18097 14.3409 9.68403 14.9291L9.81418 15.0813C9.95713 15.2485 10.0286 15.3321 10.0608 15.4355C10.0929 15.5389 10.0821 15.6504 10.0605 15.8734L10.0408 16.0765C9.96476 16.8613 9.92674 17.2538 10.1565 17.4282C10.3864 17.6027 10.7318 17.4436 11.4227 17.1255L11.6014 17.0432C11.7978 16.9528 11.8959 16.9076 12 16.9076C12.1041 16.9076 12.2022 16.9528 12.3986 17.0432L12.5773 17.1255C13.2682 17.4436 13.6136 17.6027 13.8435 17.4282C14.0733 17.2538 14.0352 16.8613 13.9592 16.0765L13.9395 15.8734C13.9179 15.6504 13.9071 15.5389 13.9392 15.4355C13.9714 15.3321 14.0429 15.2485 14.1858 15.0813L14.316 14.9291C14.819 14.3409 15.0706 14.0468 14.9828 13.7645C14.895 13.4822 14.526 13.3987 13.7881 13.2318L13.5972 13.1886C13.3875 13.1411 13.2827 13.1174 13.1985 13.0535C13.1143 12.9896 13.0603 12.8927 12.9524 12.699Z" fill="#ff2424"></path> </g></svg>    
                                                :
                                                i+1
                                            }
                                        </th>
                                        <td className='font-bold text-lg'>{v.name}</td>
                                        <td className='font-bold text-lg'>{v.score}</td>
                                    </tr>
                                )})
                            }
                        </tbody>
                    </table>
                </div>
    
                <div className='text-center'>
                    <Link to='/'>
                        <button className='btn btn-wide mt-8 btn-outline'>Return homepage</button>
                    </Link>
                </div>
            </div>
        )
    }
  return (
    
    <div className='bg-accent/40 h-full gap-y-1 flex flex-col justify-start items-strech'>

        <div className='h-4/6 flex flex-col'>
            <div className='text-center flex items-center justify-between px-4 py-2 bg-slate-800'>
                
                <div className='flex gap-2 group/roomcode'>
                    <p className='text-lg text-secondary font-semibold tracking-wider ms-2'>Room code: {Room.current}</p>
                    <button className='btn btn-xs btn-outline invisible btn-secondary group-hover/roomcode:visible' onClick={copy}>
                        <svg className="size-4" role='button' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                        </svg>
                        <span ref={copytext}>Copy</span>
                    </button>
                </div>

                <div className='text-xl text-secondary font-semibold flex items-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-error">
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                    <span>{Life}</span>
                </div>
                
                
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
                gameOver 
                ?
                <div  className='m-auto text-center'>
                    <p className='text-xl text-error'>Your game has ended</p>
                    <p className='text-3xl font-bold'>You scored: {score}</p>
                    <p className='mt-8'>However, you can stay here and inspect other players score.</p>
                </div>
                :
                (
                matchStarted
                ? <WebcamComponent submitData={submitData} handleCapture={handleCapture} setImageData={setImageData} ImageData={img} /> 
                : <button className='btn btn-primary m-auto' onClick={StartMatch}>Start Game</button>
                )
            }

        </div>

        <div className="rounded-t-lg bg-slate-800 p-2 flex flex-col h-2/6 gap-2">
            <div className='grid grid-cols-2 gap-4'>
                <button onClick={()=>setBoard(()=>false)} className={!board ? "btn btn-sm btn-accent grow" : "btn btn-sm btn-ghost grow"}>Chat</button>
                <button onClick={()=>setBoard(()=>true)} className={board ? "btn btn-sm btn-accent grow" : "btn btn-sm btn-ghost grow"}>Leaderboard</button>
                
            </div>


            <div className={ board ? "grow overflow-y-scroll relative hidden": "grow overflow-y-scroll relative"} >
                <SendMessage sendMessageSockt = {sendMessageSockt}/>
                <div ref={msgContainer}></div>
                
            </div> 

            <div id='leaderboard' className={ !board ? "grow overflow-y-scroll hidden": "grow overflow-y-scroll"}>
                <div className="overflow-x-auto">
                    <table className="table text-xs">
                        <thead>
                            <tr className='text-accent border-accent/20 hover:bg-accent/20'>
                                <th className='font-bold text-[13px]'>#</th>
                                <th className='font-bold text-[13px]'>Name</th>
                                <th className='font-bold text-[13px]'>Score</th>
                                <th className='font-bold text-[13px]'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                JoinedUserList?.map((v,i)=>{return (
                                    <tr className={ v.username === user.username ? "border-accent/20 bg-secondary/20" : "border-accent/20 hover:bg-accent/20"} key={i}>
                                        <th>{i+1}</th>
                                        <td>{v.name}</td>
                                        <td>{v.score}</td>
                                        <td>{v.game_over ? "Game Over":"Playing"}</td>
                                    </tr>
                                )})
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    </div>
  )
}
