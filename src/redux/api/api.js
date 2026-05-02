import { HERITAGE_URL, REVIEW_URL, SAVED_URL, USER_URL } from "../constant";
import { PROFILE_URL } from "../constant";
const apiUrl = import.meta.env.VITE_API_URL;

export const userEndpoints = {
    SENDOTP_API: `${apiUrl}/${USER_URL}/sendotp`,
    SIGNUP_API: `${apiUrl}/${USER_URL}/signup`,
    LOGIN_API: `${apiUrl}/${USER_URL}/login`,
    RESETPASSTOKEN_API: `${apiUrl}/${USER_URL}/reset-password-token`,
    RESETPASSWORD_API: `${apiUrl}/${USER_URL}/reset-password`
}

export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: `${apiUrl}/${PROFILE_URL}/updateUserProfileImage`,
    UPDATE_PROFILE_API: `${apiUrl}/${PROFILE_URL}/update-profile`,
    CANGE_PASSWORD_API: `${apiUrl}/${USER_URL}/changepassword`,
    DELETE_PROFILE_API: `${apiUrl}/${PROFILE_URL}/delete-profile`
}

export const heritageEndpoints = {
    CREATE_HERITAGE_API : `${apiUrl}/${HERITAGE_URL}/createHeritage`,
    FETCH_ALL_HERITAGE_API : `${apiUrl}/${HERITAGE_URL}/allHeriatge`,
    DELETE_HERITAGE_API : `${apiUrl}/${HERITAGE_URL}/deleteHeritage`,
    GET_HERITAGE_BY_ID_API : `${apiUrl}/${HERITAGE_URL}/getHeritage`,
    EDIT_HERITAGE_DETAILS_API : `${apiUrl}/${HERITAGE_URL}/editHeritage`,
}

export const savedHeritageEndpoints = {
    TOGGLE_SAVED_HERITAGE_API : `${apiUrl}/${SAVED_URL}`,
    GET_SAVED_HERITAGE_API : `${apiUrl}/${SAVED_URL}`,
}

export const reviewHeritageEndpints = {
    CREATE_HERITAGE_REVIEW_API : `${apiUrl}/${REVIEW_URL}`,
    GET_HERITAGE_REVIEW_API : `${apiUrl}/${REVIEW_URL}`,
    TOGGLE_HERITAGE_REVIEW_LIKE_API : `${apiUrl}/${REVIEW_URL}`,
    DELETE_HERIATGE_REVIEW_API : `${apiUrl}/${REVIEW_URL}`,
    GET_HERITAGE_REVIEW_STATUS : `${apiUrl}/${REVIEW_URL}/stats`,
}