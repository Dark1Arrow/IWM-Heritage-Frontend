import { HERITAGE_URL, REVIEW_URL, SAVED_URL, USER_URL } from "../constant";
import { PROFILE_URL } from "../constant";

export const userEndpoints = {
    SENDOTP_API: `${USER_URL}/sendotp`,
    SIGNUP_API: `${USER_URL}/signup`,
    LOGIN_API: `${USER_URL}/login`,
    RESETPASSTOKEN_API: `${USER_URL}/reset-password-token`,
    RESETPASSWORD_API: `${USER_URL}/reset-password`
}

export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: `${PROFILE_URL}/updateUserProfileImage`,
    UPDATE_PROFILE_API: `${PROFILE_URL}/update-profile`,
    CANGE_PASSWORD_API: `${USER_URL}/changepassword`,
    DELETE_PROFILE_API: `${PROFILE_URL}/delete-profile`
}

export const heritageEndpoints = {
    CREATE_HERITAGE_API : `${HERITAGE_URL}/createHeritage`,
    FETCH_ALL_HERITAGE_API : `${HERITAGE_URL}/allHeriatge`,
    DELETE_HERITAGE_API : `${HERITAGE_URL}/deleteHeritage`,
    GET_HERITAGE_BY_ID_API : `${HERITAGE_URL}/getHeritage`,
    EDIT_HERITAGE_DETAILS_API : `${HERITAGE_URL}/editHeritage`,
}

export const savedHeritageEndpoints = {
    TOGGLE_SAVED_HERITAGE_API : `${SAVED_URL}`,
    GET_SAVED_HERITAGE_API : `${SAVED_URL}`,
}

export const reviewHeritageEndpints = {
    CREATE_HERITAGE_REVIEW_API : `${REVIEW_URL}`,
    GET_HERITAGE_REVIEW_API : `${REVIEW_URL}`,
    TOGGLE_HERITAGE_REVIEW_LIKE_API : `${REVIEW_URL}`,
    DELETE_HERIATGE_REVIEW_API : `${REVIEW_URL}`,
    GET_HERITAGE_REVIEW_STATUS : `${REVIEW_URL}/stats`,
}