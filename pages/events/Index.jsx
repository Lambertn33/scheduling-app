import React , {useState} from 'react';
import { getSession , useSession } from 'next-auth/client'
import Header from '../components/Head/Header';
import Link from 'next/link'
import Navbar from '../components/Navbar/Navbar';
import prisma from '../../lib/prisma'
import { BsClockFill } from 'react-icons/bs'
import {FaUserAlt} from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import axios from 'axios';

export const getServerSideProps = async(context)=>{
    const session = await getSession(context)
    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    } 

    const events = await prisma.event.findMany({
        where:{
            userId:session.user.id
        },
        select:{
            id:true,
            minutes:true
        }
    })
    return {
        props:{events}
    }
}

const isSessionValid = (session) => {
    if (typeof session !== typeof undefined && session !== null && typeof session.user !== typeof undefined)
    {
        return true;
    }
    else
    {
        return false;
    }
}

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function Index({events}) {
    const [session , loading] = useSession()
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const[unformattedUrl , setUnformattedUrl] = useState('')
    const [description, setDescription] = useState('')
    const [minutes, setMinutes] = useState('')
    const [hasError , setHasError] = useState(false)
    const [errorMessage , setErrorMessage] = useState('')
    const [isLoading , setIsLoading] = useState(false)
    const endpoint = "/api/events/create"
    let formattedUrl;
    const togglePopup = () => {
        setHasError(false)
        setErrorMessage("");
        setTitle('')
        setUrl('')
        setDescription('')
        setMinutes('')
        setIsOpen(!isOpen);
    }
    const settingTitle = (e) => {
        setTitle(e.target.value)
        setUnformattedUrl(title.replace(/ /g,'-'))
        setUrl(`${window.location.hostname}/${formattedUrl}`)
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLoading(true) 
        setHasError(false)
        setErrorMessage(""); 
        if(title.trim() === "" || description.trim() === "" || minutes.trim() === ""){
            setIsLoading(false)
            setHasError(true)
            setErrorMessage("Please provide all fields..");
            return;
          }
        try {
            const user = session.user
            const res = await axios.post(endpoint,{
                title,
                url,
                description,
                minutes,
                user
            })
            if(res.data.status == 200){
                setIsLoading(false)
                setTitle('')
                setUrl('')
                setDescription('')
                setMinutes('')
                setIsOpen(false)
                window.location.reload();
            }
        } catch (error) {
            if(error.response.status !==200){
                setIsLoading(false)
                setErrorMessage(error.response.data.message)
                setHasError(true)
            }
        }
    }
    if(!loading){
       if(isSessionValid(session)){
        return (
            <>
              <Header title="Events"/>
              <div className='flex w-screen h-screen bg-gray-100'>
                    <div className='w-1/6 bg-white'>
                        <Navbar ses={session} />
                    </div>  
                    <div className='w-5/6'>
                        <div className='w-full h-full'>
                            <div className='px-12 py-20'>
                                <div className='flex justify-between'>
                                    <div>
                                        <h4 className='text-2xl font-bold'>Event Types</h4>
                                        <p className='font-semibold text-gray-400'>Create events to share for people to book on your calendar.</p>
                                    </div>
                                    <div>
                                       <button className='px-4 py-1 text-white bg-black' onClick={()=>setIsOpen(!isOpen)}>
                                           <div className='flex items-center justify-around'>
                                           <span className='text-lg font-bold'>+</span>
                                           <span className='font-bold'>New Event Type</span>
                                           </div>
                                       </button>
                                    </div>
                                </div>
                                
                                {
                                    isOpen &&
                                    <div className='popup-box'>
                                        <div className="box">
                                        <div className="">
                                        {
                                            hasError &&
                                            <div className='flex justify-center'>
                                                <span className='font-bold text-red-500'>{errorMessage}</span>
                                            </div>
                                        }
                                        <p className="text-xl font-bold">Add a new event type</p>
                                        <p className="font-semibold text-gray-400">Create a new event type for people to book times with.</p>
                                        <form onSubmit={handleSubmit} className="flex flex-col max-w-2xl gap-3 py-3">
                                            <div className="flex flex-col">
                                                <label className="text-sm font-semibold text-left">Title</label>
                                                <input type="text" name="" id="" className="w-full p-2 text-sm border" placeholder="Quick Chat" value={title} onChange={settingTitle} />
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="text-sm font-semibold text-left">Url</label>
                                                <div className="flex items-center">
                                                    <p className="p-2 px-4 font-semibold text-gray-400 border-t border-b border-l bg-gray-50">https://cal.com/{session.user.username}/</p>
                                                    <input type="text" name="" id="" readOnly className="w-full px-4 py-2 text-sm border" placeholder="" value={unformattedUrl}  />
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="text-sm font-semibold text-left">Description</label>
                                                <textarea name="" id="" cols="12" placeholder="A Quick Video Meeting" className="w-full px-4 py-2 text-sm border"  value={description} onChange={e => setDescription(e.target.value)}/>
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="text-sm font-semibold text-left">Length</label>
                                                <div className="flex border">
                                                    <input type="number" name="" id="" className="w-full px-4 py-2 text-sm" placeholder="" value={minutes} onChange={e => setMinutes(e.target.value)} />
                                                    <p className="p-2 px-4 text-gray-400 ">Minutes</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-4">
                                                <button className="p-2 px-4 border" onClick={togglePopup}>Cancel</button>
                                                <button className={isLoading ? "p-2 px-4 text-white bg-gray-400": "p-2 px-4 text-white bg-black"}>
                                                    {
                                                        isLoading ? "Please wait...":"Continue"
                                                    }
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                        </div>
                                    </div>
                                }
                                <div className='mt-4'>
                                 {
                                     events.length > 0 ? 
                                      events.map(event=>{
                                          return(
                                            <div key={event.id} className='p-4 pt-4 bg-white border border-gray-300 rounded-sm'>
                                             <div className='flex justify-between'>
                                                 <div>
                                                    <span className='text-sm font-bold'>{event.minutes} Min Meeting</span><span className='text-xs'>/{session.user.username}/{event.minutes}min</span>
                                                    <div className='flex items-center gap-4 mt-4'>
                                                        <div className='flex items-center'>
                                                            <BsClockFill className='text-gray-500'/>
                                                            <span className='ml-1 text-sm text-gray-500'>{event.minutes}min</span>
                                                        </div>
                                                        <div className='flex items-center'>
                                                            <FaUserAlt className='text-gray-500'/>
                                                            <span className='ml-1 text-sm text-gray-500'>1-on-1</span>
                                                        </div>
                                                    </div>
                                                 </div>
                                                 <div className='px-4 flex items-center'>
                                                     <Link href={{
                                                         pathname:'/events/[user]/[event]',
                                                         query:{event:event.id , user:session.user.username}
                                                     }}>
                                                        <a target="_blank">
                                                        <GoLinkExternal/>
                                                        </a>
                                                     </Link>
                                                 </div>
                                             </div>
                                            </div>
                                          )
                                      })
                                     :
                                     <div className='flex justify-center p-4 bg-white'>
                                        <span className='text-lg font-bold text-red-600'>Dear {session.user.username} you have no event types yet</span>
                                     </div>
                                 }
                                </div>
                            </div>
                        </div>
                    </div>
              </div>
            </>
          );
       }else{
        <div className='wrapper'>
            <p>You are not logged in</p>
        </div>
       }
    }else{
        return (
            <div className = "flex items-center justify-center h-screen px-auto">
            <p className = "font-bold text-center text-red-500">Please wait...</p>
          </div>
        )
    }
}
