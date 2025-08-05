import axios from "axios";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { Link, useNavigate, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../features/auth/axiosInstance";
import { getData } from "../../public/getData";
import { firstLetterCapital } from "../../public/helpers";

interface Plans{
    id: number,
    name: string,
    price: number,
}

export default function Register(){
    const { name } = useParams();
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [plans, setPlans] = useState<Plans[]>([]);
    const [plan, setPlan] = useState<Plans | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [mainError, setMainError] = useState<string>('');
    const [register, setRegister] = useState({
        first_name : "",
        last_name : "",
        email : "",
        password : "",
        confirmed : "",
    });
    console.log(name);
    
    const [error, setError] = useState({
        first_name : "",
        last_name : "",
        email : "",
        password : "",
        confirmed : "",
    });

    if(!name || name === undefined){
        getData("api/plans/get", setPlans);
    }else{
        getData(`api/plan/${name}`, setPlan);
    }

    console.log(plan);
    

    const handleData = (name: string, value: string) =>{
        setRegister(formData =>({
            ...formData,
            [name] : value
        }));
    }

    const sendData = async() =>{
        const data = {
            email : register.email.trim(),
            first_name: register.first_name.trim(),
            last_name: register.last_name.trim(),
            password: register.password.trim(),
            password_confirmation: register.confirmed.trim(),
        }
        
        let valid = true;
        const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setError({ email: "", first_name: "", last_name: "", password: "", confirmed: "" });
        
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
        
        if(data.first_name == ""){
            setError(errorData =>({
                ...errorData,
                first_name : "Champs prénom est obligatoire"
            }));

            valid = false;
        }

        if(data.last_name == ""){
            setError(errorData =>({
                ...errorData,
                last_name : "Champs nom est obligatoire"
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

        if(data.password.length < 8){
            setError(errorData =>({
                ...errorData,
                password : "Le mot de passe doit contenir au moins 8 caractères"
            }));

            valid = false;
        }

        if(register.confirmed.trim() == ""){
            setError(errorData =>({
                ...errorData,
                confirmed : "Champs confirmer le mot de passe est obligatoire"
            }));

            valid = false;
        }

        if(register.confirmed.trim() !=  data.password){
            setError(errorData =>({
                ...errorData,
                confirmed: "Le mot de passe et sa confirmation ne correspondent pas",
            }));

            valid = false;
        }
        if(valid){      
            setLoading(true);

            try{
                await axiosInstance.get('/sanctum/csrf-cookie');
                const response = await axiosInstance.post('/api/user/register', data);
                
                if(response.data.status === "success"){
                    
                    setError({
                        email : "",
                        first_name : "",
                        last_name : "",
                        password : "",
                        confirmed : "",
                    });
                    
                    dispatch(login({
                        first_name: response.data.user.first_name,
                        last_name: response.data.user.first_name,
                        email: response.data.user.email,
                        is_admin: response.data.user.is_admin,
                    }));
                    setLoading(false);
                    navigate("/dashboard");
                    setMainError("");
                }else{
                    setLoading(false);
                    console.log("error");
                }
            }catch(error: unknown){
                setLoading(false);
                if(axios.isAxiosError(error)){
                    setMainError(error.response?.data.message)
                    console.error("Erreur lors de l'inscription :", error.response?.data.message);
                }else{
                    console.error("Une erreur inattendue est survenue :", (error as Error).message);
                }
            }
        }
    }
    
    return (
        <div className="bg-login">
            <div className="container">
                <div className="d-flex justify-content-center align-items-center vh-90">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-5">
                        <h3 className="text-center">Inscription</h3>
                        <div className="bg-white rounded border mt-4">
                            <div className="p-5">
                                {mainError && 
                                    <div className="alert alert-danger text-center" role="alert">
                                        {mainError}
                                    </div>
                                }
                                <h5 className="text-center py-3"><FontAwesomeIcon icon={faUserPlus} /> Créer un nouveau compte</h5>
                                <form>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="first_name" className="form-label gray">Prénom</label>
                                            <input type="text" className="form-control" placeholder="John" aria-label="first_name"
                                                onChange={(e) => handleData("first_name", e.target.value)}
                                                value={register.first_name}
                                            />
                                            <span className="text-danger fs-7">{error && error.first_name}</span>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="last_name" className="form-label gray">Nom</label>
                                            <input type="email" className="form-control" placeholder="Doe" aria-label="last_name"
                                                onChange={(e) => handleData("last_name", e.target.value)}
                                                value={register.last_name}
                                            />
                                            <span className="text-danger fs-7">{error && error.last_name}</span>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label gray">Adresse email</label>
                                        <input type="email" className="form-control" placeholder="John.doe@example.com" aria-label="email" aria-describedby="email-addon"
                                            onChange={(e) => handleData("email", e.target.value)}
                                            value={register.email}
                                        />
                                        <span className="text-danger fs-7">{error && error.email}</span>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="password" className="form-label gray">Mot de passe</label>
                                            <input type="password" className="form-control" aria-label="password"
                                                onChange={(e) => handleData("password", e.target.value)}
                                                value={register.password}
                                            />
                                        <span className="text-danger fs-7">{error && error.password}</span>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="confirmed" className="form-label gray">Mot de passe</label>
                                            <input type="password" className="form-control" aria-label="confirmed"
                                                onChange={(e) => handleData("confirmed", e.target.value)}
                                                value={register.confirmed}
                                            />
                                            <span className="text-danger fs-7">{error && error.confirmed}</span>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <select className="form-select" aria-label="plans select">
                                                {!name ? 
                                                    plans.map((plan, index)=>(
                                                        <option value={plan.id} key={index}>{firstLetterCapital(plan.name)}</option>
                                                    )) : 
                                                    <option value={plan?.id}>{firstLetterCapital(plan?.name)}</option>
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" className="form-check-input" id="remember-me" />
                                        <label className="form-check-label" htmlFor="remember-me">
                                            Accepter les
                                            <Link to={'/'} className="text-decoration-none link-custom"> conditions générales</Link>
                                        </label>
                                    </div>
                                    {loading ? (
                                        <div className="text-center">
                                            <ClipLoader color="#3498db" loading={loading} size={50}/>
                                        </div>
                                    ) : (
                                        <button type="button" className="btn btn-blue w-100 " onClick={sendData}>
                                            <span className="ms-2">Se connecter</span>
                                        </button>
                                    )}
                                    
                                </form>
                            </div>
                        </div>
                        <div className="text-center mt-3">
                            <span className="gray">Vous avez déjà un compte ? 
                                <Link to={"/"} className="ms-2 text-decoration-none link-custom">Connectez-vous</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}