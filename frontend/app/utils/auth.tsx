import axios from "axios";

// Use environment variables with fallback for development
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/auth/";
const RECLAMATION_API_URL = process.env.NEXT_PUBLIC_RECLAMATION_API_URL || "http://localhost:8000/api/reclamation/";

axios.defaults.withCredentials = true;

// Create axios instance with default config
const apiClient = axios.create({
  withCredentials: true,
  timeout: 10000, // 10 second timeout
});

// Add response interceptor for centralized error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
); 

export const registerUser = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    telephone: string,
    role: string,
    address : string,
    dateOfBirth : string,
    cin: File | null,

    

) => {
    try { 

        const formData = new FormData();
        formData.append('user', JSON.stringify({
            first_name,
            last_name,
            email,
            password,
            telephone,
            role: "citoyen", // should be "client"
            
        }));
        

        formData.append('address', address);
        formData.append('dateOfBirth', dateOfBirth);
        formData.append('cin', cin ? cin : new Blob()); // Append empty Blob if null
        
        /*const data = {
            user: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                telephone: telephone,
                role: "citoyen", // should be "client"
            },
            address: address,
            dateOfBirth: dateOfBirth, // format as ISO string: yyyy-MM-dd
            };*/       
        const response = await axios.post(`${API_URL}citoyen/signup/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true
            });
             


        alert(
      "INFO SENT: \n" +
        JSON.stringify(formData, null, 2)
    );

       
        return response.data;
    }
    catch (e) {
    if (axios.isAxiosError(e)) {
        console.error('Axios error response:', e.response?.data);
        alert('Registration error: ' + JSON.stringify(e.response?.data));
    } else {
        console.error(e);
    }
    throw new Error("Registration failed");
    }
}

export const registerServiceProvider = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    telephone: string,
    role: string,
    serviceCategory: string,
) => {  
    try {
        const data = {
            user: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                telephone: telephone,
                role: "agent", // should be "service_provider"
            },
            
            location: location,
            serviceCategory: serviceCategory,
        };
        const response = await axios.post(`${API_URL}agent/signup/`, data, {
            withCredentials: true
        });
        alert(
      "INFO SENT: \n" +
        JSON.stringify(data, null, 2)
    );
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
    throw new Error("Agent Registration failed");
    }
}












export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}login/`, {email, password} ,
            {withCredentials: true }
        );
        console.log(
            "email" + email + " password " + password 
        )
        startTokenRefresh();
        return response.data;
    }
    catch (e){
        throw new Error("login failed hehehe");
    }
}

export const logoutUser = async () => {
    try {
        const response = await axios.post(`${API_URL}logout/`, null,
            {withCredentials: true}
        )
        alert("user logout worked! " )
        return response.data;
    }
    catch (e) {
        throw new Error("Logout failed!");
    }
    
}



export const getUserInfo = async () => {
    try {
        const response = await axios.get(`${API_URL}user-info/`, {
            withCredentials: true
        })
        return response.data;
    }
    catch (e) {
        throw new Error("Getting user failed!");
    }
    
}
export const refreshToken= async () => {
    try {
        const response = await axios.post(`${API_URL}refresh/`, null, {
            withCredentials: true
        })
        return response.data;
    }
    catch (e) {
        throw new Error("refreshing  failed!");
    }
    
}
// Call this after login
export const startTokenRefresh = () => {
  // Refresh every 110 minutes (just before expiry)
  setInterval(async () => {
    try {
      await refreshToken();
      alert("Access token refreshed automatically ✅");
    } catch (err) {
      alert("Auto refresh failed ❌");
    }
  }, 110 * 60 * 1000); // 110 minutes in ms
};


export const getAgentList = async () => {
    try {
        const response = await axios.get(`${API_URL}listAgent/`, {
            withCredentials: true
        })
        return response.data;
    }
    catch (e) {
        console.error("Error fetching Agents:", e);
        throw new Error("Getting agents failed!");
    }
    
}

export const getCitoyenList = async () => {
    try {
        const response = await axios.get(`${API_URL}listCitoyen/`, {
            withCredentials: true
        })
        return response.data;
    }
    catch (e) {
        console.error("Error fetching Citoyens:", e);
        throw new Error("Getting citoyens failed!");
    }
}

export const validateCitoyen = async (citoyenId: number) => {
    try {
        const response = await apiClient.post(`${API_URL}validateCitoyen/${citoyenId}/`, {})
        return response.data;
    }
    catch (e) {
        console.error("Error validating citoyen:", e);
        throw new Error("Validating citoyen failed!");
    }
}

export const updateUserProfile = async (userData: { first_name: string, last_name: string, telephone: string }) => {
    try {
        const response = await axios.patch(`${API_URL}user-info/`, userData, {
            withCredentials: true
        })
        return response.data;
    }
    catch (e) {
        console.error("Error updating profile:", e);
        throw new Error("Profile update failed!");
    }
}
