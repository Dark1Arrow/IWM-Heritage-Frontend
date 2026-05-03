import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { ACCOUNT_TYPE } from "../../../redux/constant"
import { toast } from "react-toastify"
import { setSignupData } from "../../../redux/api/slices/authSlices"
import { sendOTP } from "../../../redux/api/operation/authApi"

const SignupForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

    const { firstName, lastName, password, email } = formData

    const handleOnchange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const signupData = { ...formData }
        dispatch(setSignupData(signupData))
        dispatch(sendOTP(formData.email, navigate))
    }

    // Label style to mimic the "floating/notched" look in the image
    const labelStyle = "absolute left-3 -top-2.5 bg-[#F2E3D2] px-1 text-xs text-gray-600 transition-all";

    const inputStyle = "w-full border-b-2 border-stone-200 bg-transparent py-3 text-stone-800 outline-none focus:border-[#58181F] transition-all placeholder:text-stone-300";

    return (
        <form onSubmit={handleOnSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">First Name</label>
                    <input name="firstName" value={firstName} onChange={handleOnchange} className={inputStyle} placeholder="John" required />
                </div>
                <div>
                    <label className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Last Name</label>
                    <input name="lastName" value={lastName} onChange={handleOnchange} className={inputStyle} placeholder="Doe" required />
                </div>
            </div>

            <div>
                <label className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Email</label>
                <input name="email" type="email" value={email} onChange={handleOnchange} className={inputStyle} placeholder="john@example.com" required />
            </div>

            <div>
                <label className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Password</label>
                <input name="password" type="password" value={password} onChange={handleOnchange} className={inputStyle} placeholder="••••••••" required />
            </div>

            <button type="submit" className="w-full bg-[#58181F] text-white py-4 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-black transition-colors shadow-lg shadow-maroon-900/10">
                Register
            </button>
            
            <p className="text-center text-stone-500 text-sm mt-4">
                Joined already? <Link to="/login" className="text-[#58181F] font-bold">Sign In</Link>
            </p>
        </form>
    )
}


export default SignupForm