import React from 'react'
import { IoIosCheckmark} from 'react-icons/io'
import { IoLogoGoogle } from 'react-icons/io'
import FormInput from '../components/Form/FormInput';
import FormButton from '../components/Form/FormButton';

export default function success() {
    return (
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
                            <p className='text-xs text-left'>15 min Meeting between Daniel Tunel and</p>
                            <p className='text-xs text-left'>Test</p>
                        </div>
                    </div>
                    <div className='flex justify-between gap-2 mb-4'>
                        <p className='font-semibold text-sm'>When</p>
                        <div className='flex flex-col gap-1'>
                        <p className='text-xs text-left'>Wednesday 29th Dec 2021</p>
                        <p className='text-xs text-left'>4:30pm- 15mins ( <span className='text-gray-400'>Europe/Vienna</span> ) </p>
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
    )
}
