import React from 'react'
import FormButton from '../components/Form/FormButton'
import FormInput from '../components/Form/FormInput'
import FormTextArea from '../components/Form/FormTextArea'
import { FcGlobe } from 'react-icons/fc'
import {BsClockFill} from 'react-icons/bs'
import {BsFillCalendarEventFill} from 'react-icons/bs'


export default function confirmation() {
    return (
        <div className='w-screen h-screen bg-gray-100'>
            <div className='flex items-center justify-center w-full h-full'>
                <div className='px-4 bg-white'>
                    <div className='grid grid-cols-2'>
                        <div className='col-span-1'>
                            {/* <h2>
                                <FcGlobe/>
                            </h2> */}
                            <div className='flex flex-col items-start mt-4'>
                                <FcGlobe className='text-5xl'/>
                                <span className='text-sm font-semibold text-gray-400'>Daniel Tonel</span>
                                <h2 className='text-2xl font-bold text-black'>15 Min Meeting</h2>
                                <div className='mt-2'>
                                    <div className='flex items-center '>
                                        <BsClockFill />
                                        <span className='ml-2 text-sm font-semibold text-gray-400'>15 Minutes</span>
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
    )
}
