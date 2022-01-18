import React, {useState} from 'react'

import FormButton from './components/Form/FormButton'
import FormErrorMessage from './components/Form/FormErrorMessage'
import FormInput from './components/Form/FormInput'
import Form from './components/Form/Form'
import Link from 'next/link'
import { signIn } from "next-auth/client"
import { useRouter } from 'next/router'

export default function Login() {
  const [email , setemail] = useState('')
  const [password , setpassword] = useState('')
  const [hasError, sethasError] = useState(false)
  const [errorMessage, seterrorMessage] = useState('')
  const router = useRouter();

  const handleSubmit = (e) =>{
    e.preventDefault();
    e.stopPropagation();
    if(email.trim() === "" || password.trim() === ""){
      sethasError(true)
      seterrorMessage("Please provide all fields..");
      return;
    }
    signIn("credentials",{
      email,
      password,
      callbackUrl:`${window.location.origin}/bookings/Index`,
      redirect:false
    }).then(function(result){
      if(result.error !==null){
        if (result.status === 401)
                {
                    sethasError(true)
                    seterrorMessage("Invalid Credentials..");
                }
                else
                {
                    sethasError(true)
                    seterrorMessage(result.error);
                }
      }else{
        router.push(result.url);
      }
    })

  }
  function hideErrorMessage(){
    sethasError(false)
}
  
    return (
        <div className='w-screen h-screen bg-gray-100'>
            <div className='flex flex-col items-center justify-center w-full h-full'>
               <Form onSubmit={handleSubmit} title="Cal.com" subTitle="Sign in to your account" >
               {hasError && <FormErrorMessage
                   errorMessage={errorMessage}
                   onHide={hideErrorMessage}
                />} 
                  <FormInput 
                    label="Email Address"
                    type="email"   
                    value={email}  
                    onChange={e=>setemail(e.target.value)}                 
                  />
                  <FormInput 
                    label="Password"
                    type="password"
                    forgotPassword="Forgot Password?"    
                    value={password}  
                    onChange={e=>setpassword(e.target.value)}                
                  />
                  <FormButton
                  label="Sign In"
                  />
               </Form>
               <p className='mt-3'>Don t Have an account?
               <Link href='/'>
                 <a className='font-bold'>Create an account</a>
               </Link>
               </p>
            </div>
        </div>
    )
}
