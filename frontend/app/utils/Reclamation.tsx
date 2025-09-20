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

export const CreateReclamation = async (
    title: string,
    categorie: string,
    location: string,
    description: string,
    image: File | null,
    
) => {  
    try {
        const formData = new FormData();
        formData.append('titre', title);
        formData.append('category', categorie);
        formData.append('localization', location);
        formData.append('description', description);
        if (image) {
            formData.append('picture', image);
        }
        
        const response = await axios.post(`${API_URL}create/`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        alert("reclamation SENT successfully!");
        return response.data;
    }
    catch (e) {
    if (axios.isAxiosError(e)) {
        console.error('Axios error response:', e.response?.data);
        alert('Registration error: ' + JSON.stringify(e.response?.data));
    }
    else {
        console.error(e);
    }
    throw new Error("reclamation failed");
    }
}

export const validateReclamation = async (id: number) => {
    try {
        const response = await axios.post(`${API_URL}validate/${id}/`, {}, {
            withCredentials: true
        });
        return response.data;
    }
    catch (e) {
        console.error("Error validating reclamation:", e);
        throw new Error("Validation failed!");
    }
}

export const deleteReclamation = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}delete/${id}/`, {
            withCredentials: true
        });
        return response.data;
    }
    catch (e) {
        console.error("Error deleting reclamation:", e);
        throw new Error("Deletion failed!");
    }
}