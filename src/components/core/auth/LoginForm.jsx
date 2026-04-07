import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { login } from "../../../redux/api/operation/authAPI"

const Loginform = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const { email, password } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password, navigate))
    }

    // EXACT SAME STYLES AS SIGNUPFORM
    const inputContainer = "relative mb-6 w-full";
    const labelStyle = "absolute left-4 -top-2.5 bg-[#F3E5D5] px-1 text-sm text-gray-600 z-10 font-medium";
    const inputStyle = "w-full rounded-xl border border-gray-400 bg-transparent p-4 text-gray-800 text-lg outline-none focus:border-[#521319] transition-all";

    return (
        <div className="w-full mt-8">
            <form onSubmit={handleOnSubmit} className="flex flex-col w-full">

                {/* Email Field */}
                <div className={inputContainer}>
                    <label className={labelStyle}>Email</label>
                    <input
                        required
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        className={inputStyle}
                    />
                </div>

                {/* Password Field */}
                <div className={inputContainer}>
                    <label className={labelStyle}>Password</label>
                    <div className="relative">
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            className={inputStyle}
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z- cursor-pointer"
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#4A4A4A" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#4A4A4A" />
                            )}
                        </span>
                    </div>

                    <Link to="/forget-password">
                        <p className="mt-2 ml-auto max-w-max text-xs text-blue-600 font-medium hover:underline">
                            Forgot password?
                        </p>
                    </Link>
                </div>

                {/* Sign In Button - Maroon Theme */}
                <button
                    type="submit"
                    className="mt-4 rounded-md bg-[#58181F] py-3 text-lg font-semibold text-white transition-all hover:bg-opacity-90"
                >
                    Sign In
                </button>

                {/* Redirect Link */}
                <p className="mt-8 text-center text-gray-700">
                    Don't have an account?{" "}
                    <Link to="/signup" className="font-semibold border-b border-gray-700">
                        Create Account
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Loginform