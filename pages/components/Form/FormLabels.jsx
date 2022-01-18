import React from 'react'

export default function FormLabels({title , subTitle}) {
    return (
        <div className='flex flex-col gap-2'>
            {title && <h3 className='font-bold text-2xl text-center'>{title}</h3>}
            {subTitle && <h3 className='font-bold text-2xl'>{subTitle}</h3>}
        </div>
    )
}
