import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { reviewHeritageEndpints } from "../api.js"

const {
    CREATE_HERITAGE_REVIEW_API,
    GET_HERITAGE_REVIEW_API,
    TOGGLE_HERITAGE_REVIEW_LIKE_API,
    DELETE_HERIATGE_REVIEW_API,
    GET_HERITAGE_REVIEW_STATUS
} = reviewHeritageEndpints

// 1. GET ALL REVIEWS FOR A SITE (Matches: GET /:heritageId)
export const getSiteReviews = (heritageId) => {
    return async (dispatch) => {
        let result = []
        try {
            const response = await apiConnector(
                "GET",
                `${GET_HERITAGE_REVIEW_API}/${heritageId}`
            )
            if (!response?.data?.success) throw new Error(response.data.message)
            result = response?.data?.data
        } catch (error) {
            console.log("GET_SITE_REVIEWS_ERROR............", error)
        }
        return result
    }
}

// 2. CREATE A REVIEW (Matches: POST /)
export const createReview = (data, token) => {
    return async (dispatch) => {
        const toastId = toast.loading("Posting your review...")
        let success = false
        try {
            const response = await apiConnector(
                "POST",
                CREATE_HERITAGE_REVIEW_API,
                data,
                { Authorization: `Bearer ${token}` }
            )
            if (!response?.data?.success) throw new Error(response.data.message)
            toast.success("Review added successfully")
            success = true
        } catch (error) {
            console.log("CREATE_REVIEW_ERROR............", error)
            toast.error(error.response?.data?.message || "Could not post review")
        }
        toast.dismiss(toastId)
        return success
    }
}

// 3. TOGGLE LIKE ON REVIEW (Matches: PUT /:id/like)
export const toggleLikeReview = (reviewId, token) => {
    return async (dispatch) => {
        let result = null
        try {
            const response = await apiConnector(
                "PUT",
                `${TOGGLE_HERITAGE_REVIEW_LIKE_API}/${reviewId}/like`,
                null,
                { Authorization: `Bearer ${token}` }
            )
            if (!response?.data?.success) throw new Error(response.data.message)
            result = response?.data?.data // Usually returns updated like count/status
        } catch (error) {
            console.log("LIKE_REVIEW_ERROR............", error)
        }
        return result
    }
}

// 4. DELETE REVIEW (Matches: DELETE /:id)
export const deleteReview = (reviewId, token) => {
    return async (dispatch) => {
        const toastId = toast.loading("Deleting review...")
        let success = false
        try {
            const response = await apiConnector(
                "DELETE",
                `${DELETE_HERIATGE_REVIEW_API}/${reviewId}`,
                null,
                { Authorization: `Bearer ${token}` }
            )
            if (!response?.data?.success) throw new Error(response.data.message)
            toast.success("Review deleted")
            success = true
        } catch (error) {
            console.log("DELETE_REVIEW_ERROR............", error)
            toast.error("Could not delete review")
        }
        toast.dismiss(toastId)
        return success
    }
}

// 5. GET REVIEW STATS (Matches: GET /stats/:heritageId)
export const getReviewStats = (heritageId) => {
    return async (dispatch) => {
        let result = null
        try {
            const response = await apiConnector(
                "GET",
                `${GET_HERITAGE_REVIEW_STATUS}/${heritageId}`
            )
            if (!response?.data?.success) throw new Error(response.data.message)
            result = response?.data?.data
        } catch (error) {
            console.log("GET_REVIEW_STATS_ERROR............", error)
        }
        return result
    }
}