import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { login } from "../../../redux/api/operation/authApi"

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

    // SHARED REFINED STYLES
    const labelStyle = "absolute left-3 -top-2.5 bg-[#ffffff] px-2 text-[11px] font-bold uppercase tracking-wider text-stone-500 transition-all z-10";
    const inputStyle = "w-full rounded-md border border-stone-300 bg-transparent p-3.5 text-stone-800 outline-none focus:border-[#58181F] focus:ring-1 focus:ring-[#58181F] transition-all placeholder:text-stone-300";

    return (
        <div className="w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-7 w-full">

                {/* Email Field */}
                <div className="relative group">
                    <label className={labelStyle}>Email Address</label>
                    <input
                        required
                        type="email"
                        name="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={handleOnChange}
                        className={inputStyle}
                    />
                </div>

                {/* Password Field */}
                <div className="relative group">
                    <label className={labelStyle}>Password</label>
                    <div className="relative">
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={handleOnChange}
                            className={inputStyle}
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-stone-400 hover:text-[#58181F] transition-colors"
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible fontSize={22} />
                            ) : (
                                <AiOutlineEye fontSize={22} />
                            )}
                        </span>
                    </div>

                    <div className="flex justify-end mt-2">
                        <Link to="/forget-password">
                            <p className="text-[11px] uppercase tracking-widest text-[#58181F] font-bold hover:underline underline-offset-4 transition-all">
                                Forgot Password?
                            </p>
                        </Link>
                    </div>
                </div>

                {/* Sign In Button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full rounded-md bg-[#58181F] py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#3d1116] active:scale-[0.98] shadow-lg shadow-maroon-900/20"
                    >
                        Sign In to Archive
                    </button>
                </div>

                {/* Redirect Link */}
                <div className="text-center pt-2">
                    <p className="text-sm text-stone-600 font-light">
                        New to the collection?{" "}
                        <Link 
                            to="/signup" 
                            className="font-bold text-[#58181F] hover:underline decoration-stone-300 underline-offset-4 transition-all"
                        >
                            Create Account
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Loginform;