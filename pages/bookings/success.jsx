import React from 'react'
import { IoIosCheckmark} from 'react-icons/io'
import { IoLogoGoogle } from 'react-icons/io'
import { getSession , useSession } from 'next-auth/client'
import FormInput from '../components/Form/FormInput';
import FormButton from '../components/Form/FormButton';
import Header from '../components/Head/Header';
import prisma from '../../lib/prisma'
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
    const { eventId , guestNames, bookingId } = context.query
    const eventType = await prisma.event.findUnique({
        where:{
            id:eventId
        },
        include:{
            booking:true
        }
    })
    const actualEventType = JSON.parse(JSON.stringify(eventType))
    return {
        props:{actualEventType , guestNames}
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

export default function Success({actualEventType , guestNames}) {
    const [session , loading] = useSession()
    if(!loading){
        if(isSessionValid(session)){
            return (
                <>
                <Header title="Meeting Set" />
                <div className='h-screen w-screen bg-gray-100'>
                    <div className=' flex h-full w-full justify-center items-center'>
                        <div className='bg-white px-8 max-w-4'>
                            <div className='flex justify-center m-4'>
                                <div className='bg-green-200 rounded-full'>
                                <IoIosCheckmark className='text-4xl text-green-600' />
                                </div>
                            </div>
                            <div className='mt-4'>
                              <h2 className='text-lg font-bold text-center'>This Meeting is scheduled</h2>
                                <p className='text-sm mt-2'>we emailed you and other attendees a calendar invitation with all <br /> the details</p>
                            </div>
                            <hr className='m-4' />
                            <div className='flex justify-between gap-2 mb-4'>
                                <p className='font-semibold text-sm'>What</p>
                                <div className='flex flex-col gap-1'>
                                    <p className='text-xs text-left'>15 min Meeting between {session.user.username} and</p>
                                    <p className='text-xs text-left'>{guestNames}</p>
                                </div>
                            </div>
                            <div className='flex justify-between gap-2 mb-4'>
                                <p className='font-semibold text-sm'>When</p>
                                <div className='flex flex-col gap-1'>
                                <p className='text-xs text-left'>{new Date(actualEventType.booking[0].event_date).toISOString().slice(0,10)}</p>
                                <p className='text-xs text-left'>{actualEventType.booking[0].from}- {actualEventType.booking[0].duration}mins</p>
                                </div>
                            </div>
                            <hr className='m-4' />
                            <div className='flex justify-between gap-2 mb-4 items-center'>
                                <p className='font-semibold text-sm'>Add To Calendar</p>
                                <div className='flex gap-4'>
                                    <div className='border border-gray-200 p-2'>
                                       <IoLogoGoogle className='text-4xl text-black' />
                                    </div>
                                    <div className='border border-gray-200 p-2'>
                                       <IoLogoGoogle className='text-4xl text-black' />
                                    </div>
                                    <div className='border border-gray-200 p-2'>
                                       <IoLogoGoogle className='text-4xl text-black' />
                                    </div>
                                    <div className='border border-gray-200 p-2'>
                                       <IoLogoGoogle className='text-4xl text-black' />
                                    </div>
                                </div>
                            </div>
                            <hr className='m-4' />
                            <p className='text-center text-sm text-gray-400 m-4'>Create your own booking link with Cal.com</p>
                            <div className="flex mb-4">
                               <FormInput />
                               <FormButton label="Try it for free"/>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            )
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
