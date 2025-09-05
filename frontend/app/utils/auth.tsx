import axios from "axios";
const API_URL = "http://127.0.0.1:8000/api/auth/";


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
        const response = await axios.post(`${API_URL}agent/signup/`, data,
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