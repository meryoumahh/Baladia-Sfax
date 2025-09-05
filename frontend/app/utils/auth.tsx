import axios from "axios";
const API_URL = "http://127.0.0.1:8000/api/auth/";


export const registerUser = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    telephone: string,
   // profilePicture: File | null,
    role: string,
    address : string,
    dateOfBirth : string,
    paymentMethod : string,
    preferences : string[]

) => {
    try { 
        const data = {
            user: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                telephone: telephone,
                role: "client", // should be "client"
            },
            address: address,
            dateOfBirth: dateOfBirth, // format as ISO string: yyyy-MM-dd
            paiementMethod: paymentMethod, // mind the spelling "paiementMethod" as per backend model
            preferences: preferences.length > 0 ? preferences[0] : "AUTRE", // single choice string expected
            };       
        const response = await axios.post(`${API_URL}client/signup/`, data,
             );


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
    agenceId: string,
    businessName: string,
    location: string,
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
                role: "service_provider", // should be "service_provider"
            },
            AgenceId: agenceId, 
            businessName: businessName,
            location: location,
            serviceCategory: serviceCategory,
        };
        const response = await axios.post(`${API_URL}service-provider/signup/`, data,
                );
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
    throw new Error("Service Provider Registration failed");
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
        return response.data;
    }
    catch (e){
        throw new Error("login failed hehehe");
    }
}

export const getUserInfo = async () => {
    try {
        const response = await axios.get(`${API_URL}user-info/`,
            {withCredentials: true}
        )
        return response.data;
    }
    catch (e) {
        throw new Error("Getting user failed!");
    }
    
}

export const logoutUser = async () => {
    try {
        const response = await axios.post(`${API_URL}logout/`, null,
            {withCredentials: true}
        )
        return response.data;
    }
    catch (e) {
        throw new Error("Logout failed!");
    }
    
}