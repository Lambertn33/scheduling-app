import React , {useState} from 'react'

import axios from 'axios'
import FormButton from './components/Form/FormButton'
import FormErrorMessage from './components/Form/FormErrorMessage'
import FormInput from './components/Form/FormInput'
import Link from 'next/link'
import { signIn } from "next-auth/client"
import { useRouter } from 'next/router'

export default function Signup() {

    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [hasError, sethasError] = useState(false)
    const [errorMessage, seterrorMessage] = useState('')
    const [isLoading , setIsLoading] = useState(false)
    const endpoint = "/api/users/signup"
    const router = useRouter();

    const submitData = async(e) =>{
        setIsLoading(true)
        e.preventDefault()
        e.stopPropagation();
        try {
         const res = await axios.post(endpoint,{
             username,email,password
         })
         if(res.data.status == 200){
            signIn("credentials",{
              email,
              password,
              callbackUrl:`${window.location.origin}/bookings/Index`,
              redirect:false
            }).then(function(result){
                router.push(result.url);
            })
          }
        } catch (error) {
            if(error.response.status !==200){
                setIsLoading(false)
                seterrorMessage(error.response.data.message)
                sethasError(true)
            }
        }
    }
    function hideErrorMessage(){
        sethasError(false)
    }
    return (
        <div className='w-screen h-screen px-48'>
            <div className='flex items-center justify-center w-full h-full'>
                <div className='grid grid-cols-2 gap-32'>
                    <div className=''>
                        <div className='flex flex-col justify-center'>
                            <h4 className='text-xl font-bold text-left'>Cal.com</h4>
                            <h2 className='text-5xl font-bold'>You re one step away from simple scheduling</h2>
                            <p className='mt-4 text-sm text-gray-600'>I love being able to use a tool that just works.and that is open source
                                As a developer, i love being empowered to contribute to a tool that I use
                                regularly
                            </p>
                            <div className='flex items-center gap-2 mt-2'>
                                <div>
                                   <div className='p-4 bg-black rounded-full'></div>
                                </div>
                                 <div className='flex flex-col'>
                                     <p className='text-sm font-bold text-gray-600'>Cassidy Williams
                                      <span className='text-sm font-bold text-blue-400'>@cassidoo</span>
                                     </p>
                                     <p className='text-sm text-gray-600'>Director of developer experience at Netlify</p>
                                 </div>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <div className='p-8 border'>
                            <h2 className='text-xl font-bold'>Start your 14-day free Trial</h2>
                            <p className='text-xs text-gray-600'>No credit card required. try all Pro features for 14 days</p>
                            <p className='text-xs text-gray-600'>upgrade at any time to pro for $12/month</p>

                            <hr className='m-4'/>
                            <div className=''>
                                <form onSubmit={submitData}>
                                {hasError && <FormErrorMessage
                                 errorMessage={errorMessage}
                                 onHide={hideErrorMessage}
                                 />} 
                                <FormInput 
                                    type="text"
                                    placeholder="Username"
                                    prefix="Cal.com/"
                                    value={username}     
                                    onChange={e=>setusername(e.target.value)}               
                                />
                                <FormInput 
                                    type="email"
                                    placeholder="email address"    
                                    value={email}  
                                    onChange={e=>setemail(e.target.value)}     
                                />
                                <FormInput 
                                    type="password"
                                    placeholder="*******"  
                                    value={password}   
                                    onChange={e=>setpassword(e.target.value)}      
                                />
                                <FormButton
                                label={!isLoading ? "Sign up for free" : "Please wait ..."}
                                isLoading={isLoading}
                                />
                                </form>
                                <p className='mt-3'>Already Have an account?
                                <Link href='/'>
                                    <a className='font-bold'>Login</a>
                                </Link>
                                </p>
                            </div>
                        </div>
                        <div className='p-6 bg-gray-200'>
                            <p className='text-xs'>
                                By signing up you agree to our <span className='font-bold'>Terms of service</span> and <span className='font-bold'>Privacy Policy</span>
                            </p>
                            <p className='mt-1 text-xs'>Need Help? <span className='font-bold'>Get in Touch</span></p>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    )
}
