import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { heritageEndpoints } from "../api.js" // Ensure you define your endpoints here

const { CREATE_HERITAGE_API, FETCH_ALL_HERITAGE_API, DELETE_HERITAGE_API ,GET_HERITAGE_BY_ID_API,EDIT_HERITAGE_DETAILS_API} = heritageEndpoints

const createHeritage = (formData, token, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Creating Heritage Site...")
        // dispatch(setLoading(true)) // Optional: if you have a loading state for heritage
        console.log("hey")
        try {
            const response = await apiConnector(
                "POST",
                CREATE_HERITAGE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            )

            console.log("CREATE_HERITAGE_API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Heritage Site Created Successfully")
            navigate("/dashboard/my-heritage") // Or wherever you want to redirect

        } catch (error) {
            console.log("CREATE_HERITAGE_API ERROR............", error)
            toast.error(error.response?.data?.message || "Could not create heritage site")
        }

        // dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

const getAllHeritage = (token) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading Heritage Sites...")
        // dispatch(setLoading(true)) 
        try {
            const response = await apiConnector(
                "GET",                      // Method
                FETCH_ALL_HERITAGE_API,     // URL
                null,                       // Body (Must be null for GET)
                {                           // Headers (This is the 4th argument)
                    Authorization: `Bearer ${token}`,
                }
            );

            console.log("GET_ALL_HERITAGE_API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            // Optional: If you have a Redux slice to store the heritage list
            // dispatch(setHeritageData(response.data.data))

            toast.success("Heritage Sites Loaded")
            return response.data.data; // Return data so you can use it in your component's useEffect

        } catch (error) {
            console.log("GET_ALL_HERITAGE_API ERROR............", error)
            toast.error(error.response?.data?.message || "Could not fetch heritage sites")
        } finally {
            // dispatch(setLoading(false))
            toast.dismiss(toastId)
        }
    }
}

const deleteHeritage = (heritageId, token) => {
    return async (dispatch) => {
        const toastId = toast.loading("Deleting Site...");
        let success = false;
        try {
            const response = await apiConnector(
                "DELETE",
                `${DELETE_HERITAGE_API}/${heritageId}`,
                null, // No body for DELETE
                { Authorization: `Bearer ${token}` }
            );

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            toast.success("Site Deleted Successfully");
            success = true;
        } catch (error) {
            console.log("DELETE_HERITAGE_API ERROR............", error);
            toast.error(error.response?.data?.message || "Could not delete site");
        }
        toast.dismiss(toastId);
        return success;
    };
};

// GET Heritage Details by ID
const getHeritageDetails = (heritageId,savedList) => {
  return async (dispatch) => {
    let result = null;
    try {
      const response = await apiConnector(
        "GET",
        `${GET_HERITAGE_BY_ID_API}/${heritageId}`, // Ensure this constant is defined
        null
      );

      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }
      
      result = response?.data?.data;
      result = {
        ...result,
        isSaved: savedList.some(
          (saved) => saved.heritageId._id.toString() === result._id.toString()
        ),
      };
      console.log("saved" , savedList)
    } catch (error) {
      console.log("GET_HERITAGE_DETAILS_API ERROR............", error);
      // Optional: toast.error("Could not fetch heritage details");
    }
    return result;
  };
};

// EDIT Heritage
const updateHeritage = (formData, token, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Updating Heritage...");
    try {
      const response = await apiConnector(
        "POST", // or "PATCH" depending on your Backend route
        EDIT_HERITAGE_DETAILS_API, // Ensure this constant is defined
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }

      toast.success("Heritage Updated Successfully");
      navigate("/dashboard/all-heritage"); // Navigate to your list page
    } catch (error) {
      console.log("EDIT_HERITAGE_API ERROR............", error);
      toast.error(error.response?.data?.message || "Could not update heritage");
    }
    toast.dismiss(toastId);
  };
};

export { createHeritage, getAllHeritage,deleteHeritage,getHeritageDetails,updateHeritage }