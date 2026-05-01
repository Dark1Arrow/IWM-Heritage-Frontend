import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPasswordToken } from '../redux/api/operation/authApi'
import { BiArrowBack } from "react-icons/bi"
import { Link } from 'react-router-dom'

const ForgetPassword = () => {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordToken(email, setEmailSent))
  }

  // Consistent Theme Styles
  const inputContainer = "relative mb-6 w-full";
  const labelStyle = "absolute left-4 -top-2.5 bg-[#F3E5D5] px-1 text-sm text-gray-600 z-10 font-medium";
  const inputStyle = "w-full rounded-xl border border-gray-400 bg-transparent p-4 text-gray-800 text-lg outline-none focus:border-[#521319] transition-all";

  return (
    <div className="min-h-screen w-full bg-[#D6E9F8] flex items-center justify-center p-4">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        /* The Cream Rounded Container */
        <div className="w-full max-w-[550px] rounded-[40px] bg-[#F3E5D5] p-8 md:p-12 shadow-2xl">
          
          <h1 className="text-[2.5rem] font-bold text-[#4A4A4A] mb-2 leading-tight">
            {!emailSent ? "Reset Password" : "Check Email"}
          </h1>

          <div className="my-6 text-[1.1rem] leading-relaxed text-gray-600">
            {!emailSent 
              ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery." 
              : <p>We have sent the reset email to <span className='font-bold text-[#521319]'>{email}</span></p>
            }
          </div>

          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <div className={inputContainer}>
                <label className={labelStyle}>Email Address</label>
                <input
                  required
                  type='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputStyle}
                />
              </div>
            )}
            
            <button 
              type='submit' 
              className="mt-2 w-full rounded-xl bg-[#521319] py-4 text-xl font-bold text-white hover:bg-[#3d0e12] transition-colors shadow-lg"
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>

          <div className="mt-8">
            <Link to="/login" className='flex items-center gap-2 text-gray-700 font-medium hover:text-[#521319] transition-all'>
              <BiArrowBack className="text-xl" /> Back to login
            </Link>
          </div>

        </div>
      )}
    </div>
  )
}

export default ForgetPassword