import React from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

const Template = ({ formType, title }) => {
  return (
    <div className="flex min-h-screen w-full bg-white">
      
      {/* LEFT SIDE: Visual/Brand Section (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-[#58181F] relative flex-col justify-between p-16">
        {/* Top Branding */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-400 rounded-full" />
          <span className="text-white font-serif text-xl tracking-widest uppercase">Indore Dursen</span>
        </div>

        {/* Central Quote/Text */}
        <div className="max-w-md">
          <h2 className="text-white font-serif text-5xl leading-tight mb-6">
            Connecting the <span className="italic text-amber-400">past</span> to your <span className="italic text-amber-400">present</span>.
          </h2>
          <div className="h-1 w-20 bg-amber-400" />
        </div>

        {/* Bottom Footer for Sidebar */}
        <p className="text-stone-400 text-xs uppercase tracking-widest">
          © 2026 Iwm imc Project
        </p>
      </div>

      {/* RIGHT SIDE: Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#FDFBF9] p-8 md:p-16">
        <div className="w-full max-w-md">
          
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-serif text-stone-900 mb-2">
              {title || (formType === "signup" ? "Create an Account" : "Welcome Back")}
            </h1>
            <p className="text-stone-500 text-sm">
              Please enter your details to continue.
            </p>
          </div>

          {/* Form Switcher */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100">
             {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>

          {/* Simple Footer Link for Mobile */}
          <div className="mt-8 text-center lg:hidden">
             <p className="text-stone-400 text-xs uppercase tracking-widest">Indore Heritage Archive</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Template