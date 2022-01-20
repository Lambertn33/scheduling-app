import React from 'react';
import { getSession , useSession } from 'next-auth/client'
import Header from '../components/Head/Header';
import Navbar from '../components/Navbar/Navbar';
import prisma from '../../lib/prisma'
import { BsClockFill } from 'react-icons/bs'
import {FaUserAlt} from 'react-icons/fa'

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
    console.log(events)
    if(!loading){
       if(isSessionValid(session)){
        return (
            <>
              <Header title="Events"/>
              <div className='flex w-screen h-screen bg-gray-100'>
                    <div className='w-1/6 bg-white'>
                        <Navbar session={session} />
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
                                       <button className='px-4 py-1 text-white bg-black'>
                                           <div className='flex items-center justify-around'>
                                           <span className='text-lg font-bold'>+</span>
                                           <span className='font-bold'>New Event Type</span>
                                           </div>
                                       </button>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                 {
                                     events.length > 0 ? 
                                      events.map(event=>{
                                          return(
                                            <div className='p-4 pt-4 bg-white border border-gray-300 rounded-sm'>
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
