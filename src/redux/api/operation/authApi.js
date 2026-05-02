import { toast } from "react-toastify";
import { userEndpoints } from "../api"
import { Navigate } from "react-router-dom";
import { setLoading, setToken } from "../slices/authSlices";
import { apiConnector } from "../apiConnector";
import { setUser } from "../slices/profileSlices";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API
} = userEndpoints

const sendOTP = (email, naviagte) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true
            })
            console.log("hey")

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            naviagte("/verify-email")
            toast.success("OTP Send Successfully")
        } catch (error) {
            console.log("Send OTP Error... ", error)

            if (error.status === 401) {
                toast.error(error.data?.message)
            } else {
                const errorMessage = error.data?.message || "Somthing went wrong. Please try again"
                toast.error(errorMessage)
            }
        } finally {
            dispatch(setLoading(false))
            toast.dismiss(toastId)
        }
    }
}

const signUp = (accountType, firstName, lastName, email, password, confirmPassword, otp, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            })

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Signup Successfull")
            navigate("/login")
        } catch (error) {
            console.log("Sign up Error... ", error)

            if (error.status === 401) {
                toast.error(error.data?.message)
            } else {
                const errorMessage = error.data?.message || "Somthing went wrong. Please try again"
                toast.error(errorMessage)
            }
        } finally {
            dispatch(setLoading(false))
            toast.dismiss(toastId)
        }
    }
}

const login = (email, password, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try {
            const respose = await apiConnector("POST", LOGIN_API, {
                email, password
            })

            if (!respose.data.success) {
                throw new Error(respose.data.message)
            }

            toast.success("Login successfully")
            dispatch(setToken(respose.data.token))

            const userImage = respose.data?.user?.image ? respose.data.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${respose.data.user.firstName} ${respose.data.user.lastName}`

            dispatch(setUser({ ...respose.data.user, image: userImage }))

            console.log("token", respose.data?.token)

            localStorage.setItem("token", JSON.stringify(respose.data?.token))
            localStorage.setItem("user", JSON.stringify({ ...respose.data.user, image: userImage }))
            navigate("/dashboard/my-profile")

        } catch (error) {
            console.log("Login Error... ", error)

            if (error.status === 401) {
                toast.error(error.data?.message)
            } else {
                const errorMessage = error.data?.message || "Somthing went wrong. Please try again"
                toast.error(errorMessage)
            }
        } finally {
            dispatch(setLoading(false))
            toast.dismiss(toastId)
        }
    }
}

const getPasswordToken = (email, setEmailSent) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(false))

        try {
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {
                email,
            })
            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Reset Email Sent")
            setEmailSent(true)
        } catch (error) {
            console.log("Get Password Token Error... ", error)

            if (error.status === 401) {
                toast.error(error.data?.message)
            } else {
                const errorMessage = error.data?.message || "Somthing went wrong. Please try again"
                toast.error(errorMessage)
            }
        } finally {
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }
    }
}

const resetPassword = (password, confirmPassword, token, naviagte) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, {
                password,
                confirmPassword,
                token
            })
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Password Reset successfully")
            naviagte("/login")
        } catch (error) {
            console.log("ResetPassword Error... ", error)

            if (error.status === 401) {
                toast.error(error.data?.message)
            } else {
                const errorMessage = error.data?.message || "Somthing went wrong. Please try again"
                toast.error(errorMessage)
            }
        }finally{
        toast.dismiss(toastId)
        dispatch(setLoading(false))
        }
    }
}

const logout = (navigate) => {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        // dispatch(resetCard())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}

export { sendOTP, signUp, login, resetPassword, getPasswordToken, logout }