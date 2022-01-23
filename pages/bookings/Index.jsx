import React from 'react'
import { getSession , useSession } from 'next-auth/client'
import Header from '../components/Head/Header'
import Navbar from '../components/Navbar/Navbar'
import { IoIosClose, IoIosAlarm } from 'react-icons/io'
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

    const bookings = await prisma.booking.findMany({
        where:{
            userId:session.user.id
        },
        include:{
            event:true,
            guest:true
        }
    })
    const actualBookings = JSON.parse(JSON.stringify(bookings))
    return {
        props:{
            actualBookings
        }
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
export default function Index({actualBookings}) {
    const [session , loading] = useSession()
    if(!loading){
        if(isSessionValid(session))
        {
            return (
                <>
                <Header title="Bookings"/>
                <div className='flex w-screen h-screen bg-gray-100 '>
                    <div className='w-1/6 bg-white'>
                        <Navbar session={session} />
                    </div>
                    <div className='w-5/6'>
                    <div className='w-full h-full'>
                        <div className='px-12 py-20'>
                            <div className=''>
                                <h4 className='text-2xl font-bold'>Bookings</h4>
                                <p className='font-semibold text-gray-400'>see upcoming and past events through your event type links</p>
                            </div>
                            <div className='mt-8'>
                                <div className='flex gap-4'>
                                    <p className='font-extrabold text-black'>Upcoming</p>
                                    <p className='text-gray-400'>Past</p>
                                    <p className='text-gray-400'>Canceled</p>
                                </div>
                            </div>
                            {
                               actualBookings.length > 0 ?
                               actualBookings.map(booking=>{
                                return(
                                    <div key={booking.id} className='p-12 pt-8 mt-8 bg-white border border-gray-300 rounded-sm'>
                            <div className='flex justify-between'>
                                <div className='flex gap-8'>
                                    <div className='flex flex-col'>
                                        <span className='text-sm font-semibold'>{new Date(booking.event_date).toISOString().slice(0,10)}</span>
                                        <span className='text-sm text-gray-700'>{booking.from}</span>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='font-semibold'>{booking.duration} Min Meeting between {session.user.username} and {booking.guest[0].names}</span>
                                        <span className='text-sm text-gray-700'>{booking.event.title}</span>
                                        <span className='text-sm text-black'>{booking.guest[0].email}</span>
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <div className>
                                    <button className='border '>
                                        <div className='flex items-center justify-center gap-2 px-2 py-2'>
                                        <IoIosAlarm className='text-lg font-bold'/>
                                        <span className='font-semibold'>Reschedule</span>
                                        </div>
                                    </button>
                                    <button className='border'>
                                        <div className='flex items-center justify-center gap-2 px-2 py-2 '>
                                        <IoIosClose className='text-lg font-bold'/>
                                        <span className='font-semibold'>Cancel</span>
                                        </div>
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                                )
                            })
                               :
                               <div className='flex justify-center p-4 bg-white'>
                                        <span className='text-lg font-bold text-red-600'>Dear {session.user.username} you have no bookings yet</span>
                               </div>
                            }
                            <div className='flex justify-center py-4'>
                            <button className='px-4 py-2 text-sm text-white bg-gray-400 rounded-sm'>
                                No More Results
                            </button>
                            </div>
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
