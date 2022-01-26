import React , {useState} from 'react';
import { getSession , useSession } from 'next-auth/client'
import prisma from '../../../../lib/prisma'
import DatePicker from 'react-datepicker'
import Header from '../../../../components/Head/Header';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { BsClockFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

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
    const { event } = context.query
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
        props:{eventType}
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
export default function Index({eventType}) {
    const router = useRouter()
    const [session , loading] = useSession()
    const { minutes,title } = eventType
    const [startDate , setStartDate] = useState(new Date())
    const [eventDate , setEventDate] = useState(new Date())
    const [from , setFrom] = useState('')
    const [to , setTo] = useState('')
    const [hasError , setHasError] = useState(false)
    const [errorMessage , setErrorMessage] = useState('')
    const [isLoading , setIsLoading] = useState(false)
    const endpoint = "/api/bookings/create"
    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
      };
     const formatTime = ( date) => {
         let fromTime = `${date.getHours()}:${date.getMinutes()}`
         setStartDate(date)
         setEventDate(date.toISOString().slice(0, 10))
         setFrom(fromTime)
         setTo(fromTime)
     }

     const submitData = async(e) =>{
         e.preventDefault()
         e.stopPropagation()
         setIsLoading(true) 
         setHasError(false)
         setErrorMessage("");
         try {
            const user = session.user
            const res = await axios.post(endpoint,{
                eventDate:startDate,
                from,
                to,
                eventTypeId:eventType.id,
                duration:minutes,
                user:user
            }) 
            if(res.data.status == 200){
                router.push({
                    pathname:"/events/[user]/[event]/[date]",
                    query:{
                        user:session.user.username,
                        event:eventType.id,
                        date:eventDate
                    }
                })
            }
         } catch (error) {
            setIsLoading(false) 
             setHasError(true)
             setErrorMessage('an error occured...please try again')
         }

     }

  if(!loading){
    if(isSessionValid(session)){
        return (
            <>
            <Header title={`${minutes} minutes meeting`}/>
            <div className='w-screen h-screen bg-gray-100'>
              <div className='flex items-center justify-center w-full h-full'>
                  <div className='p-16 px-40 bg-white border'>
                    <div className='flex justify-center'>
                    {
                        hasError &&
                        <span className='py-4 font-bold text-red-500'>
                            {
                                errorMessage
                            }
                        </span>
                    }
                    </div>
                   <div className='flex gap-2'>
                       <div className='flex flex-col items-start'>
                           <span className='text-lg text-gray-400 uppercase'>{session.user.username}</span>
                           <h3 className='text-3xl font-bold text-black'>{minutes} minutes meeting</h3>
                           <h3 className='text-xl font-bold text-black'>{title}</h3>
                           <div className='flex items-center gap-2 mt-4'>
                                <BsClockFill className='text-gray-500'/>
                                <span>{minutes} minutes</span>
                           </div>
                       </div>
                       <hr className='h-full border border-red-700'/>
                       <div className='flex flex-col items-start'>
                            <span className='mb-2 font-bold'>Select Date and Time</span>
                            <DatePicker
                                 className='p-2 border'
                                 selected={startDate}
                                 onChange={(date) => formatTime(date)}
                                 filterDate={isWeekday}
                                 minDate={new Date()}
                                 showTimeSelect
                                timeIntervals={minutes}
                                minTime={setHours(setMinutes(new Date(), 0),8)}
                                maxTime={setHours(setMinutes(new Date(), 10), 20)}
                                />

                       </div>
                   </div>
                   <div className='flex justify-center mt-4'>
                       <button onClick={submitData}
                        className={!isLoading ? 'bg-black text-white p-3 rounded-sm': 'bg-gray-400 text-white p-3 rounded-sm'}>
                           <span className='font-bold'>
                               {!isLoading ? "Proceed":"Please wait..."}
                           </span>
                       </button>
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
