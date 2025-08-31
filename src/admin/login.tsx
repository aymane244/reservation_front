import { useState } from "react";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { adminLogin } from "../features/auth/adminAuthSlice";
import adminAxios, { setAdminToken } from "../features/auth/adminAxios";

export default function AdminLogin(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                email : "adresse email invalide"
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
                const response = await adminAxios.post('/api/admin/login', data);
                console.log(response);
                
                if(response.data.status === "success"){
                    setAdminToken(response.data.token);
                    localStorage.setItem('admin_token', response.data.token);

                    dispatch(adminLogin({
                        first_name: response.data.admin.first_name,
                        last_name: response.data.admin.last_name,
                        email: response.data.admin.email,
                        is_super_admin: response.data.admin.is_super_admin,
                        token: response.data.token
                    }));

                    navigate("/admin/dashboard");
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
                    <div className="col-12 col-sm-10 col-md-6 col-lg-5">
                        <h3 className="text-center">Login</h3>
                        <div className="bg-white shadow rounded p-5 border mt-4">
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
                                        <input type="email" className="form-control" placeholder="Jhon.doe@example.com" aria-label="email" aria-describedby="email-addon"
                                            onChange={(e) => handleData("email", e.target.value)}
                                            value={input.email}
                                        />
                                    </div>
                                    <span className="text-danger fs-7">{error && error.email}</span>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label gray">Votre mot de passe</label>
                                    <div className="input-group">
                                        <span className="input-group-text w-10" id="password-addon"><FontAwesomeIcon icon={faLock} color={'#4B5563'} /></span>
                                        <input type="password" className="form-control" aria-label="password" aria-describedby="password-addon"
                                            onChange={(e) => handleData("password", e.target.value)}
                                            value={input.password}
                                        />
                                    </div>
                                    <span className="text-danger fs-7">{error && error.password}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-start"> 
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" className="form-check-input" id="remember-me" />
                                        <label className="form-check-label" htmlFor="remember-me">Souvenez-vous de moi</label>
                                    </div>
                                    <Link to={'/admin/forgot-password'} className="text-decoration-none gray fs-7 mt-text">Mot de passe oublié</Link>
                                </div>
                                {isLoading ? (
                                    <div className="text-center">
                                        <ClipLoader color="#3498db" loading={isLoading} size={50}/>
                                    </div>
                                ) : (
                                    <button type="button" className="btn btn-black w-100 border border-dark" onClick={sendData}>Se connecter</button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}