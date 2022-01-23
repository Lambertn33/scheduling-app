import React from 'react'
import Image from 'next/image'
import { signOut } from 'next-auth/client';
import Link from 'next/link';
import { BiLink } from 'react-icons/bi'
import { BsCalendarFill } from 'react-icons/bs'
import { HiLogout } from 'react-icons/hi'

export default function Navbar({ ses }) {
    return (
        <div className='h-screen border-r-2'>
            <div className='flex flex-col justify-between h-full p-4 border'>
                <div className=''>
                    <h2 className='text-xl font-bold'>Cal.com</h2>
                    <div className='flex flex-col mt-4'>
                        <div className='flex items-center mb-4'>
                            <BiLink className='text-xl text-gray-600' />
                            <Link href="/events/Index">
                                <a className='ml-2 font-semibold text-gray-600'>Event Types</a>
                            </Link>
                        </div>
                        <div className='flex items-center mb-4'>
                            <BsCalendarFill className='text-gray-600' />
                            <Link href="/bookings/Index">
                                <a className='ml-2 font-semibold text-gray-600'>Bookings</a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                 <div>
                 <Image src="/images/avatar.png" className="p-8 bg-gray-500 rounded-full" width={50} height={50}/>
                 </div>
                  <div className='flex flex-col items-center'>
                      <span className='font-bold'>{ses.user.username}</span>
                      <div className='flex items-center'>
                          <HiLogout />
                         <span onClick={signOut} className='ml-3 cursor-pointer font-semi-bold'>Logout</span>
                      </div>
                  </div>
                </div>
            </div>
        </div>
    )
}