import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axiosInstance from "../features/auth/axiosInstance";

export default function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [mainError, setMainError] = useState<string>('');
    const [error, setError] = useState({
        email: "",
        password: "",
    });
    
    const [input, setInput] = useState({
        email: "",
        password: ""
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
            password: input.password.trim(),
        }

        let valid = true;
        const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setError({ email: "", password: "" });

        if(data.email == ""){
            setError(errorData =>({
                ...errorData,
                email : "Champs adresse email est obligatoire"
            }));

            valid = false;
        }else if(!isEmail.test(data.email)){
            setError(errorData =>({
                ...errorData,
                email : "Adresse email invalide"
            }));

            valid = false;
        }

        if(data.password == ""){
            setError(errorData =>({
                ...errorData,
                password : "Champs mot de passe est obligatoire"
            }));

            valid = false;
        }

        if(valid){
            setIsLoading(true);

            try{
                await axiosInstance.get('/sanctum/csrf-cookie');
                const response = await axiosInstance.post('/api/user/login', data);

                if(response.data.status === "success"){
                    dispatch(login({
                        first_name: response.data.user.first_name,
                        last_name: response.data.user.last_name,
                        email: response.data.user.email,
                        is_admin: response.data.user.is_admin,
                    }));
                    navigate("/dashboard");
                }else{
                    setIsLoading(false);
                    setMainError(response.data.message);
                }
            }catch(error: any){
                setIsLoading(false);
                setMainError("Login failed");
                console.error("Login error:", error);
            }
        }
    }

    return (
        <div className="bg-login">
            <div className="container">
                <div className="d-flex justify-content-center align-items-center vh-90">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-5">
                        <h3 className="text-center">Réservation</h3>
                        <div className="bg-white rounded border mt-4">
                            <div className="p-5">
                                {mainError && 
                                    <div className="alert alert-danger text-center" role="alert">
                                        {mainError}
                                    </div>
                                }
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label gray">Adresse email</label>
                                        <div className="input-group">
                                            <span className="input-group-text w-10 rounded-custom-icon"><FontAwesomeIcon icon={faEnvelope} color={'#929DAB'} /></span>
                                            <input type="email" className="form-control border-start-0 rounded-custom-input ps-1" placeholder="John.doe@example.com" aria-label="email"
                                                onChange={(e) => handleData("email", e.target.value)}
                                                value={input.email}
                                            />
                                        </div>
                                        <span className="text-danger fs-7">{error && error.email}</span>
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between">
                                            <label htmlFor="password" className="form-label gray">Mot de passe</label>
                                            <Link to={'/forgot-password'} className="text-decoration-none fs-7 mt-text link-custom">Mot de passe oublié</Link>
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-text w-10 rounded-custom-icon">
                                                <FontAwesomeIcon icon={faLock} color={'#929DAB'} />
                                            </span>
                                            <input type={passwordVisible ? "text" : "password"} className="form-control border-start-0 rounded-custom-input ps-1 z-1" aria-label="password"
                                                onChange={(e) => handleData("password", e.target.value)}
                                                value={input.password}
                                            />
                                            {passwordVisible ? (
                                                <FiEyeOff 
                                                    className="position-absolute top-0 end-0 me-3 pointer mt-icon z-3" 
                                                    onClick={() => setPasswordVisible((visible) => !visible)}
                                                />
                                            ) : (
                                                <FiEye 
                                                    className="position-absolute top-0 end-0 me-3 pointer mt-icon z-3" 
                                                    onClick={() => setPasswordVisible((visible) => !visible)}
                                                />
                                            )}
                                        </div>
                                        <span className="text-danger fs-7">{error && error.password}</span>
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" className="form-check-input" id="remember-me" />
                                        <label className="form-check-label" htmlFor="remember-me">Souvenez-vous de moi</label>
                                    </div>
                                    {isLoading ? (
                                        <div className="text-center">
                                            <ClipLoader color="#3498db" loading={isLoading} size={50}/>
                                        </div>
                                    ) : (
                                        <button type="button" className="btn btn-blue w-100 " onClick={sendData}>
                                            <FontAwesomeIcon icon={faRightFromBracket} />
                                            <span className="ms-2">Se connecter</span>
                                        </button>
                                    )}
                                    
                                </form>
                            </div>
                            <div className="separator mb-5">ou</div>
                            <div className="pb-5 px-5 d-flex">
                                <button type="button" className="btn btn-blue w-100">
                                    <FontAwesomeIcon icon={faFacebookF} />
                                    <span className="ms-2">Facebook Login</span>
                                </button>
                                <button type="button" className="btn btn-danger w-100 ms-2">
                                    <FontAwesomeIcon icon={faGoogle} />
                                    <span className="ms-2">Google Login</span>
                                </button>
                            </div>
                        </div>
                        <div className="text-center mt-3">
                            <span className="gray">Pas encore de compte ? 
                                <Link to={"/register"} className="ms-2 text-decoration-none link-custom">Créez-en un</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}