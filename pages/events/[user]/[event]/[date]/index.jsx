import React from 'react'
import { getSession , useSession } from 'next-auth/client'
import FormButton from '../../../../components/Form/FormButton'
import FormInput from '../../../../components/Form/FormInput'
import FormTextArea from '../../../../components/Form/FormTextArea'
import Header from '../../../../components/Head/Header';
import { FcGlobe } from 'react-icons/fc'
import {BsClockFill} from 'react-icons/bs'
import {BsFillCalendarEventFill} from 'react-icons/bs'

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
    const { event , date } = context.query
    const eventType = await prisma.event.findUnique({
        where:{
            id:event
        },
        select:{
            id:true,
            title:true,
            description:true,
            URL:true,
            minutes:true,
            userId:true
        }
    })
    return {
        props:{eventType , date}
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


export default function confirmation({eventType , date}) {
    const [session , loading] = useSession()
    console.log(eventType)
    if(!loading){
       if(isSessionValid(session)){
        return (
            <>
            <Header title="Header 1" />
              <div className='w-screen h-screen bg-gray-100'>
                 <div className='flex items-center justify-center w-full h-full'>
                     <div className='px-4 bg-white'>
                         <div className='grid grid-cols-2'>
                             <div className='col-span-1'>
                                 <div className='flex flex-col items-start mt-4'>
                                     <FcGlobe className='text-5xl'/>
                                     <span className='text-sm font-semibold text-gray-400'>{session.user.username}</span>
                                     <h2 className='text-2xl font-bold text-black'>{eventType.minutes} Min Meeting</h2>
                                     <div className='mt-2'>
                                         <div className='flex items-center '>
                                             <BsClockFill />
                                             <span className='ml-2 text-sm font-semibold text-gray-400'>{eventType.minutes} Minutes</span>
                                         </div>
                                         <div className='flex mt-2'>
                                             <BsFillCalendarEventFill className='text-green-600' />
                                             <span className='ml-2 text-sm font-semibold text-green-600'>4:30pm</span>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div className='col-span-1'>
                                <form>
                                <FormInput 
                                         type="text"
                                         placeholder="Username"
                                         label="Your name"              
                                     />
                                <FormInput 
                                         type="email"
                                         placeholder="you@example.com"
                                         label="Email Address"              
                                     />
                                 <FormTextArea label="Additional Notes"/>
                                 <div className='flex mb-4 ml-4'>
                                     <button className='px-4 py-1 bg-black rounded-md'>
                                         <span className='font-bold text-white'>Confirm</span>
                                     </button>
                                     <button className='px-4 py-1 ml-4 bg-white border border-black rounded-md'>
                                         <span className='font-bold text-black'>Cancel</span>
                                     </button>
                                 </div>
                                </form>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
            </>
         )
       }else{
        return(
            <div className='wrapper'>
                <p>You are not logged in</p>
            </div>
        )
       }
    }else{
        return (
            <div className = "flex items-center justify-center h-screen px-auto">
            <p className = "font-bold text-center text-red-500">Please wait...</p>
          </div>
        )
    }
}
