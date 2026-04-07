import React from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

const Template = ({ formType, title }) => {
  return (
    <div className="flex min-h-screen w-full bg-[#D6E9F8]"> {/* Outer blue background */}
      
      {/* 1. Corrected Sidebar: Use exact width % */}
      <div className="hidden lg:flex w-[35%] bg-[#521319] min-h-screen shrink-0" />

      {/* 2. Main Content Area: Simplified layout */}
      <div className="flex flex-1 items-center justify-start lg:-ml-10"> {/* Negative margin to 'overlap' */}
        
        {/* 3. The Cream Container: Large, central form */}
        <div className="h-[90vh] w-full max-w-[900px] rounded-l-[50px] bg-[#F3E5D5] shadow-2xl flex flex-col items-center justify-center p-6 md:p-12">
          
          <div className="w-full max-w-[600px]"> {/* Contained width for the form */}
            <h1 className="text-[2.6rem] font-bold text-[#4A4A4A] mb-12">
              {title || "Create Account"}
            </h1>

            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Template