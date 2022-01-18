import React from 'react'
import { Formik } from 'formik'

import FormButton from './components/Form/FormButton'
import FormInput from './components/Form/FormInput'
import Form from './components/Form/Form'

export default function Login() {
    return (
        <div className='w-screen h-screen bg-gray-100'>
            <div className='flex flex-col justify-center items-center w-full h-full'>
               <Form title="Cal.com" subTitle="Sign in to your account" >
                  <FormInput 
                    label="Email Address"
                    type="email"                    
                  />
                  <FormInput 
                    label="Password"
                    type="password"
                    forgotPassword="Forgot Password?"                    
                  />
                  <FormButton
                  label="Sign In"
                  />
               </Form>
               <p className='mt-3'>Don t Have an account?<span className='font-bold'>Create an account</span></p>
            </div>
        </div>
    )
}
