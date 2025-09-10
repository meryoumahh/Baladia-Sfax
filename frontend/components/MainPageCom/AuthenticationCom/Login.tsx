import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/formRegister.css';

function FormLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //handle form submission

    return (
        <>
        </>
    )
}
export default FormLogin;