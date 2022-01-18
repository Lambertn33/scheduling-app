import React from 'react'
import { TiDelete } from 'react-icons/ti'
import { IoIosClose, IoIosAlarm } from 'react-icons/io'
 
export default function Index() {
    return (
        <div className='h-screen w-screen bg-gray-100'>
            <div className='w-full h-full'>
                <div className='px-12 py-20'>
                    <div className=''>
                        <h4 className='text-2xl font-bold'>Bookings</h4>
                        <p className='text-gray-400 font-semibold'>see upcoming and past events through your event type links</p>
                    </div>
                    <div className='mt-8'>
                        <div className='flex gap-4'>
                            <p className='text-black font-extrabold'>Upcoming</p>
                            <p className='text-gray-400'>Past</p>
                            <p className='text-gray-400'>Canceled</p>
                        </div>
                    </div>
                    <div className='mt-8 p-12 pt-8 bg-white border border-gray-300 rounded-sm'>
                        <div className='flex justify-between'>
                            <div className='flex gap-8'>
                                <div className='flex flex-col'>
                                    <span className='font-semibold text-sm'>Wed, 29 Dec</span>
                                    <span className='text-sm text-gray-700'>16:30 - 16:45</span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='font-semibold'>15 Min Meeting between Daniel Tonel and Test</span>
                                    <span className='text-sm text-gray-700'>"asfasfas"</span>
                                    <span className='text-sm text-black'>asfasfas@gmail.com</span>
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <button className=' border '>
                                    <div className='flex px-2  gap-2 justify-center items-center'>
                                    <IoIosAlarm className='text-lg font-bold'/>
                                    <span className='font-semibold'>Reschedule</span>
                                    </div>
                                </button>
                                <button className='border'>
                                    <div className='flex px-2 justify-center items-center py-2 gap-2 '>
                                    <IoIosClose className='text-lg font-bold'/>
                                    <span className='font-semibold'>Cancel</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='py-4 flex justify-center'>
                    <button className='bg-gray-400 text-white text-sm px-4 py-2 rounded-sm'>
                        No More Results
                    </button>
                    </div>
                </div>
        </div>
        </div>
    )
}
