import axios from "axios";
const API_URL = "http://localhost:8000/api/reclamation/";
axios.defaults.withCredentials = true; 


export const getReclamationList = async () => {
    try {
        const response = await axios.get(`${API_URL}user-reclamations/`,
            {withCredentials: true}
        )
        return response.data;
    }
    catch (e) {
        console.error("Error fetching Reclamations:", e);
        throw new Error("Getting Reclamations failed!");
    }
    
}