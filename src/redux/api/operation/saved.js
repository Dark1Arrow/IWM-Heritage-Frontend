import { toast } from "react-hot-toast"
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
            console.log("TOGGLE_SAVE_HERITAGE_API ERROR............", error);
            toast.error(error.response?.data?.message || "Could not update saved heritage");
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
            console.log("GET_SAVED_HERITAGE_API ERROR............", error);
            toast.error(error.response?.data?.message || "Could not fetch saved sites");
        }
        toast.dismiss(toastId);
        return result;
    };
};

export {getSavedHeritage,toggleSaveHeritage}