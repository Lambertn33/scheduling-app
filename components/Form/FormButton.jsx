import React from 'react'

export default function FormButton({label , isLoading}) {
    let styles;
    if(isLoading){
        styles = "w-full px-3 py-2 text-white font-bold text-base bg-gray-500 rounded-sm"
    }else{
        styles="w-full px-3 py-2 text-white font-bold text-base bg-black rounded-sm"
    }
    return (
        <div className='mt-4'>
            <button className={styles}>
                {label}
            </button>
        </div>
    )
}
