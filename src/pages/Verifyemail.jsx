import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/common/Loading'
import OTPInput from 'react-otp-input'
import { Link } from 'react-router-dom'
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx"
import { sendOTP, signUp } from '../redux/api/operation/authApi'

const Verifyemail = () => {
    const [otp, setOtp] = useState("")
    const { signupData, loading } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!signupData) {
            navigate("/signup")
        }
    }, [])

    const handleVerifyAndSignUp = (e) => {
        e.preventDefault()
        const { firstName, lastName, password, confirmPassword, email, accountType } = signupData
        dispatch(signUp(accountType,  firstName,lastName, email, password, confirmPassword, otp, navigate))
    }

    return (
        <div className="min-h-screen w-full bg-[#D6E9F8] flex items-center justify-center p-4">
            {loading ? (
                <Loading />
            ) : (
                /* The Cream Rounded Container matching your Theme */
                <div className="w-full max-w-[600px] rounded-[40px] bg-[#F3E5D5] p-8 md:p-12 shadow-2xl">
                    
                    <h1 className="text-[2.5rem] font-bold text-[#4A4A4A] mb-2">
                        Verify Email
                    </h1>
                    
                    <p className="text-[1.125rem] text-gray-600 mb-8">
                        A verification code has been sent to you. Enter the code below to complete your registration.
                    </p>

                    <form onSubmit={handleVerifyAndSignUp} className="flex flex-col">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    placeholder="-"
                                    className="w-[70px] lg:w-[90px] aspect-square rounded-xl border border-gray-400 bg-transparent text-center text-2xl font-semibold text-gray-800 focus:border-[#521319] focus:outline-none transition-all"
                                />
                            )}
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 8px"
                            }}
                        />

                        <button
                            type="submit"
                            className="w-full mt-10 rounded-xl bg-[#521319] py-4 text-xl font-bold text-white hover:bg-[#3d0e12] transition-colors shadow-lg"
                        >
                            Verify Email
                        </button>
                    </form>

                    <div className="mt-8 flex items-center justify-between font-medium">
                        <Link to="/signup">
                            <p className="text-gray-700 flex items-center gap-x-2 hover:text-[#521319] transition-all">
                                <BiArrowBack className="text-xl" /> Back To SignUp
                            </p>
                        </Link>

                        <button
                            className="flex items-center text-[#521319] gap-x-2 cursor-pointer hover:underline"
                            onClick={() => {
                                dispatch(sendOTP(signupData.email, navigate));
                                setOtp("");
                            }}
                        >
                            <RxCountdownTimer className="text-xl" /> Resend it
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Verifyemail