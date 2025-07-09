import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { url } from "../../public/helpers";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function ForgotPassword(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [mainError, setMainError] = useState<string>('');
    const [error, setError] = useState({
        email: "",
    });
    
    const [input, setInput] = useState({
        email: "",
    });

    const handleData = (name: string, value: string) => {
        setInput(formData => ({
            ...formData,
            [name]: value
        }));
    }

    const sendData = async () => {
        const data = {
            email : input.email.trim(),
        }

        let valid = true;
        const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(data.email == ""){
            setError(errorData =>({
                ...errorData,
                email : "Champs adresse email est obligatoire"
            }));

            valid = false;
        }else if(!isEmail.test(data.email)){
            setError(errorData =>({
                ...errorData,
                email : "adresse email invalide"
            }));

            valid = false;
        }

        // if(valid){
        //     setIsLoading(true);

        //     try{
        //         const response = await axios.post(`${url}/api/user/login`, data);
        //         if(response.data.status === "error"){
        //             setIsLoading(false);
        //             setMainError(response.data.data);
        //         }else{
        //             localStorage.setItem('token', response.data.data.token);
        //             dispatch(login({ name: '', email: '' }));
        //             setIsLoading(false);
        //             navigate("/dashboard");
        //             setMainError("");
        //         }
        //     }catch(error: unknown){
        //         setIsLoading(false);

        //         if(axios.isAxiosError(error)){
        //             setMainError(error.response?.data.detail)
        //             console.error("Erreur :", error.response?.data.detail);
        //         }else{
        //             console.error("Une erreur inattendue est survenue :", (error as Error).message);
        //         }
        //     }
        // }
    }

    return (
        <div className="bg-login">
            <div className="container">
                <div className="d-flex justify-content-center align-items-center vh-90">
                    <div className="col-12 col-sm-10 col-md-6 col-lg-5">
                        <div className="p-5 mt-4">
                            {mainError && 
                                <div className="alert alert-danger text-center" role="alert">
                                    {mainError}
                                </div>
                            }
                            <h3 className="text-center mt-3">Réservation</h3>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label gray">Votre adresse email</label>
                                    <div className="input-group">
                                        <span className="input-group-text w-10" id="email-addon"><FontAwesomeIcon icon={faEnvelope} color={'#4B5563'} /></span>
                                        <input type="email" className="form-control" placeholder="John.doe@example.com" aria-label="email" aria-describedby="email-addon"
                                            onChange={(e) => handleData("email", e.target.value)}
                                            value={input.email}
                                        />
                                    </div>
                                    <span className="text-danger fs-7">{error && error.email}</span>
                                </div>
                                {isLoading ? (
                                    <div className="text-center">
                                        <ClipLoader color="#3498db" loading={isLoading} size={50}/>
                                    </div>
                                ) : (
                                    <button type="button" className="btn btn-blue w-100" onClick={sendData}>
                                        <FontAwesomeIcon icon={faRightToBracket} className="me-2" />
                                        Envoyer le lien de réinitialisation par e-mail
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}