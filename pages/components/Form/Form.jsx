import React from 'react'
import FormButton from './FormButton'
import FormInput from './FormInput'
import FormLabels from './FormLabels'


export default function Form({children ,title , subTitle}) {
    return (
        <>
            <FormLabels 
            title={title}
            subTitle={subTitle}
            />
            <div className='bg-white mt-8 p-12'>
                <form>
                {children}
                </form>
            </div>
        </>
    )
}
