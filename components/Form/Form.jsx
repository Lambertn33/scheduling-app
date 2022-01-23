import React from 'react'
import FormButton from './FormButton'
import FormInput from './FormInput'
import FormLabels from './FormLabels'


export default function Form({children ,title ,onSubmit, subTitle}) {
    return (
        <>
            <FormLabels 
            title={title}
            subTitle={subTitle}
            />
            <div className='p-12 mt-8 bg-white'>
                <form onSubmit={onSubmit}>
                   {children}
                </form>
            </div>
        </>
    )
}
