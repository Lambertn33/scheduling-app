import React from 'react'

export default function FormInput({label , type,forgotPassword,prefix,value,...otherProps}) {
    return (
        <div className='mt-4 mb-4'>
          <div className='flex justify-between'>
            {label && <label htmlFor="" className='font-bold'>{label}</label>}
            {forgotPassword && <span className='font-bold'>Forgot Password? </span>}
          </div>
         <div className='flex'>
          {prefix && <p className='px-2 py-2 text-sm bg-gray-200'>{prefix}</p>}
          <input type={type} name="" id="" 
            value={value}
            className='px-2 py-2 text-sm border border-gray-300 rounded-sm w-96 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
            {...otherProps}
          />
         </div>
        </div>
    )
}
