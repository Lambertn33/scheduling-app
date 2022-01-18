import React from 'react'

export default function FormButton({label}) {
    return (
        <div className='mt-4'>
            <button className='w-full px-3 py-2 text-white font-bold text-base bg-black rounded-sm'>
                {label}
            </button>
        </div>
    )
}
