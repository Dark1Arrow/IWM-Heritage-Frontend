import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { resetPassword } from "../redux/api/operation/authAPI"
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { Link } from "react-router-dom"
import { BiArrowBack } from "react-icons/bi"

const UpdatePassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const { loading } = useSelector((state) => state.auth)
    
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { password, confirmPassword } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const token = location.pathname.split("/").at(-1)
        dispatch(resetPassword(password, confirmPassword, token, navigate))
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
                        Choose New Password
                    </h1>

                    <p className="my-6 text-[1.1rem] leading-relaxed text-gray-600">
                        Almost done. Enter your new password and you're all set.
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        {/* New Password Field */}
                        <div className={inputContainer}>
                            <label className={labelStyle}>New Password</label>
                            <div className="relative">
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={handleOnChange}
                                    placeholder="Enter password"
                                    className={inputStyle}
                                />
                                <span 
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z- cursor-pointer text-gray-600" 
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? <AiOutlineEyeInvisible size={24}/> : <AiOutlineEye size={24}/>}
                                </span>
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div className={inputContainer}>
                            <label className={labelStyle}>Confirm New Password</label>
                            <div className="relative">
                                <input
                                    required
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleOnChange}
                                    placeholder="Confirm password"
                                    className={inputStyle}
                                />
                                <span 
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z- cursor-pointer text-gray-600" 
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                >
                                    {showConfirmPassword ? <AiOutlineEyeInvisible size={24}/> : <AiOutlineEye size={24}/>}
                                </span>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="mt-2 w-full rounded-xl bg-[#521319] py-4 text-xl font-bold text-white hover:bg-[#3d0e12] transition-colors shadow-lg"
                        >
                            Reset Password
                        </button>
                    </form>

                    <div className="mt-8">
                        <Link to="/login" className="flex items-center gap-2 text-gray-700 font-medium hover:text-[#521319] transition-all">
                            <BiArrowBack className="text-xl"/> Back to login
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UpdatePassword