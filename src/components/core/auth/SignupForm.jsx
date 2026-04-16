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

    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.ADMIN)
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
        const signupData = { ...formData, accountType }
        dispatch(setSignupData(signupData))
        dispatch(sendOTP(formData.email, navigate))
    }

    // Label style to mimic the "floating/notched" look in the image
    const labelStyle = "absolute left-3 -top-2.5 bg-[#F2E3D2] px-1 text-xs text-gray-600 transition-all";
    const inputStyle = "w-full rounded-lg border border-gray-400 bg-transparent p-3 text-gray-800 outline-none focus:border-maroon-800";

    return (
        <div className="w-full mt-8">
            <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-6">

                {/* Row for First and Last Name */}
                <div className="flex gap-x-4">
                    <div className="relative flex-1">
                        <label className={labelStyle}>First Name</label>
                        <input
                            placeholder="Enter first name"
                            type="text"
                            required
                            name="firstName"
                            value={firstName}
                            onChange={handleOnchange}
                            className={inputStyle}
                        />
                    </div>

                    <div className="relative flex-1">
                        <label className={labelStyle}>Last Name</label>
                        <input
                            placeholder="Enter last name"
                            type="text"
                            required
                            name="lastName"
                            value={lastName}
                            onChange={handleOnchange}
                            className={inputStyle}
                        />
                    </div>
                </div>

                {/* Email Field */}
                <div className="relative">
                    <label className={labelStyle}>Email</label>
                    <input
                        placeholder="Enter email"
                        type="email"
                        required
                        name="email"
                        value={email}
                        onChange={handleOnchange}
                        className={inputStyle}
                    />
                </div>

                {/* Password Field */}
                <div className="relative">
                    <label className={labelStyle}>Password</label>
                    <input
                        placeholder="Enter password"
                        type="password"
                        required
                        name="password"
                        value={password}
                        onChange={handleOnchange}
                        className={inputStyle}
                    />
                </div>

                {/* Submit Button - Maroon Color */}
                <button
                    type="submit"
                    className="mt-4 rounded-md bg-[#58181F] py-3 text-lg font-semibold text-white transition-all hover:bg-opacity-90"
                >
                    Sign up
                </button>

                <p className="mt-2 text-sm text-gray-700">
                    Already have an account? <span className="cursor-pointer font-semibold underline">
                        <Link to="/login" className="font-semibold border-b border-gray-700">
                            Login
                        </Link>
                    </span>
                </p>
            </form>
        </div>
    )
}

export default SignupForm