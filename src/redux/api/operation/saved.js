import { toast } from "react-toastify"
import { apiConnector } from "../apiConnector"
import { savedHeritageEndpoints } from "../api.js"

const {
    TOGGLE_SAVED_HERITAGE_API,
    GET_SAVED_HERITAGE_API
} = savedHeritageEndpoints

// TOGGLE Save/Unsave (Matches: POST /:heritageId)
const toggleSaveHeritage = (heritageId, token) => {
    return async (dispatch) => {
        const toastId = toast.loading("Updating saved list...");
        let success = false;
        try {
            // Note: Since heritageId is a URL param in your router, 
            // we append it to the API URL
            const response = await apiConnector(
                "POST",
                `${TOGGLE_SAVED_HERITAGE_API}/${heritageId}`,
                null, // No body needed as ID is in the URL
                { Authorization: `Bearer ${token}` }
            );
            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            toast.success(response.data.message || "Heritage list updated");
            success = true;
        } catch (error) {
            console.log("Saved Toggle Heritage Error... ", error)

            if (error.status === 401) {
                toast.error(error.data?.message)
            } else {
                const errorMessage = error.data?.message || "Somthing went wrong. Please try again"
                toast.error(errorMessage)
            }
        }
        toast.dismiss(toastId);
        return success;
    };
};

// GET All Saved Heritages (Matches: GET /)
const getSavedHeritage = (token) => {
    return async (dispatch) => {
        const toastId = toast.loading("Fetching your saved sites...");
        let result = [];
        try {
            const response = await apiConnector(
                "GET",
                GET_SAVED_HERITAGE_API,
                null,
                { Authorization: `Bearer ${token}` }
            );

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            result = response?.data?.data;
        } catch (error) {
           console.log("Get Saved Heritage Error... ", error)

            if (error.status === 401) {
                toast.error(error.data?.message)
            } else {
                const errorMessage = error.data?.message || "Somthing went wrong. Please try again"
                toast.error(errorMessage)
            }
        }
        toast.dismiss(toastId);
        return result;
    };
};

export { getSavedHeritage, toggleSaveHeritage }