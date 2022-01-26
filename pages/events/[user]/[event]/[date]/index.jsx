import React, { useState } from 'react'
import { getSession , useSession } from 'next-auth/client'
import prisma from '../../../../../lib/prisma'
import FormInput from '../../../../../components/Form/FormInput'
import FormTextArea from '../../../../../components/Form/FormTextArea'
import FormErrorMessage from '../../../../../components/Form/FormErrorMessage'
import Header from '../../../../../components/Head/Header';
import { FcGlobe } from 'react-icons/fc'
import {BsClockFill} from 'react-icons/bs'
import {BsFillCalendarEventFill} from 'react-icons/bs'
import axios from 'axios'
import {useRouter} from 'next/router'

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
       include:{
           booking:true
       }
    })
    const actualEventType = JSON.parse(JSON.stringify(eventType))
    return {
        props:{actualEventType , date}
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
export default function Index({actualEventType , date}) {
    const booking_id = actualEventType.booking[0].id
    const router = useRouter()
    const [session , loading] = useSession()
    const [names , setNames] = useState('')
    const [email , setEmail] = useState('')
    const [description , setDescription] = useState('')
    const [hasError , setHasError] = useState(false)
    const [errorMessage , setErrorMessage] = useState('')
    const [isLoading , setIsLoading] = useState(false)
    const endpoint = "/api/guests/create"
    const handleSubmit = async (e) =>{
       try {
        setIsLoading(true)
        e.preventDefault()
        e.stopPropagation()
        const response = await axios.post(endpoint ,{
            names , email , description , booking_id
        })
        if(response.data.status == 200){
            router.push({
                pathname:"/bookings/success",
                query:{
                    eventId:actualEventType.id,
                    bookingId:booking_id,
                    guestNames:names
                }
            })
        }
       } catch (error) {
        if(error.response.status !==200){
            setIsLoading(false)
            setErrorMessage(error.response.data.message)
            setHasError(true)
        }
       }
    }
    
    function hideErrorMessage(){
        setHasError(false)
    }
    function clearForm(){
        setHasError(false)
        setIsLoading(false)
        setErrorMessage('')
        setNames('')
        setDescription('')
        setEmail('')
    }
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
                                     <h2 className='text-2xl font-bold text-black'>{actualEventType.minutes} Min Meeting</h2>
                                     <div className='mt-2'>
                                         <div className='flex items-center '>
                                             <BsClockFill />
                                             <span className='ml-2 text-sm font-semibold text-gray-400'>{actualEventType.minutes} Minutes</span>
                                         </div>
                                         <div className='flex mt-2'>
                                             <BsFillCalendarEventFill className='text-green-600' />
                                             <span className='ml-2 text-sm font-semibold text-green-600'>{actualEventType.booking[0].from}</span>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div className='col-span-1'>
                                <form onSubmit={handleSubmit}>
                                <div className='py-4'>
                                {hasError && <FormErrorMessage
                                 errorMessage={errorMessage}
                                 onHide={hideErrorMessage}
                                 />}
                                </div> 
                                <FormInput 
                                         type="text"
                                         placeholder="Username"
                                         label="Guest names" 
                                         value={names}
                                         onChange = {e=>setNames(e.target.value)}         
                                     />
                                <FormInput 
                                         type="email"
                                         placeholder="you@example.com"
                                         label="Guest Email Address"     
                                         value={email}
                                         onChange = {e=>setEmail(e.target.value)}         
                                     />
                                 <FormTextArea
                                  label="Additional Notes"
                                   value={description}
                                    onChange={e=>setDescription(e.target.value)}/>


                                 <div className='flex mb-4 ml-4'>
                                     <button type="submit" className={
                                         !isLoading ? 'px-4 py-1 bg-black rounded-md' :'px-4 py-1 bg-gray-400 rounded-md'
                                     }>
                                         <span className='font-bold text-white'>
                                             {
                                                 !isLoading ? "Confirm" :"Please wait.."
                                             }
                                         </span>
                                     </button>
                                     <button type="button" onClick={clearForm} className='px-4 py-1 ml-4 bg-white border border-black rounded-md'>
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
