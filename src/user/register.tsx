import axios from "axios";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { Link, useNavigate, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import axiosInstance, { centralAxios } from "../features/auth/axiosInstance";
import { getData } from "../../public/getData";
import { firstLetterCapital } from "../../public/helpers";

interface Plans{
    id: number,
    name: string,
    price: number,
    activity_id: number,
}

interface Activities{
    id: number,
    name: string,
}

export default function Register(){
    const { name } = useParams();
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [plans, setPlans] = useState<Plans[]>([]);
    const [activities, setActivities] = useState<Activities[]>([]);
    const [activity, setActivity] = useState<Activities | null>(null);
    const [plan, setPlan] = useState<Plans | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [mainError, setMainError] = useState<string>('');
    const [selectedActivityId, setSelectedActivityId] = useState<number | null>(1);
    const [selectedPlanId, setSelectedPlanId] = useState<number | null>(1);
    const [register, setRegister] = useState({
        first_name : "",
        last_name : "",
        email : "",
        password : "",
        confirmed : "",
        plan_id : 1,
    });
    
    const [error, setError] = useState({
        first_name : "",
        last_name : "",
        email : "",
        password : "",
        confirmed : "",
    });

    if(!name || name === undefined){
        getData("api/plans/get", setPlans, setActivities);
    }else{
        getData(`api/plan/${name}`, setPlan, setActivity);
    }

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
            activity_id: selectedActivityId,
            plan_id: selectedPlanId,
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
                await centralAxios.get('/sanctum/csrf-cookie');
                const response = await centralAxios.post('/api/user/register', data);

                if(response.data.status === 'success'){
                    const user = response.data.user;
                    const tenantSubdomain = response.data.tenant_subdomain;

                    dispatch(
                        login({
                            user: {
                                first_name: user.first_name,
                                last_name: user.last_name,
                                email: user.email,
                                is_admin: user.is_admin,
                                activity_name: user.activity?.name || '',
                                plan_name: user.plan?.name || '',
                                is_trial: user.is_trial,
                                expire_date: new Date(user.trial_will_finish),
                            },
                            tenantSubdomain,
                        })
                    );

                    // Redirect to tenant subdomain
                    const tenantUrl = window.location.hostname.includes('localhost')
                    ? `http://${tenantSubdomain}.localhost:3000/dashboard`
                    : `https://${tenantSubdomain}.reservation.aimane-web-dev.com/dashboard`;

                    window.location.href = tenantUrl;
                }else{
                    setLoading(false);
                    setMainError(response.data.message);
                    console.error('Login failed:', response.data.message);
                }
            }catch(error){
                setLoading(false);
                setMainError(error);
                console.error('Login error:', error);
            }
        }
    }
    
    return (
        <div className="bg-login">
            <div className="container">
                <div className="d-flex justify-content-center align-items-center py-5">
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
                                            <label htmlFor="first_name" className="form-label gray fs-7">Prénom</label>
                                            <input type="text" className="form-control" placeholder="John" aria-label="first_name"
                                                onChange={(e) => handleData("first_name", e.target.value)}
                                                value={register.first_name}
                                            />
                                            <span className="text-danger fs-7">{error && error.first_name}</span>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="last_name" className="form-label gray fs-7">Nom</label>
                                            <input type="email" className="form-control" placeholder="Doe" aria-label="last_name"
                                                onChange={(e) => handleData("last_name", e.target.value)}
                                                value={register.last_name}
                                            />
                                            <span className="text-danger fs-7">{error && error.last_name}</span>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label gray fs-7">Adresse email</label>
                                        <input type="email" className="form-control" placeholder="John.doe@example.com" aria-label="email" aria-describedby="email-addon"
                                            onChange={(e) => handleData("email", e.target.value)}
                                            value={register.email}
                                        />
                                        <span className="text-danger fs-7">{error && error.email}</span>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="password" className="form-label gray fs-7">Mot de passe</label>
                                            <input type="password" className="form-control" aria-label="password"
                                                onChange={(e) => handleData("password", e.target.value)}
                                                value={register.password}
                                            />
                                            <span className="text-danger fs-7">{error && error.password}</span>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="confirmed" className="form-label gray fs-7">Confirmer Mot de passe</label>
                                            <input type="password" className="form-control" aria-label="confirmed"
                                                onChange={(e) => handleData("confirmed", e.target.value)}
                                                value={register.confirmed}
                                            />
                                            <span className="text-danger fs-7">{error && error.confirmed}</span>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="form-label gray">Plan</label>
                                        <div className="col-md-12">
                                            <select
                                                className="form-select"
                                                aria-label="Activity Select"
                                                value={selectedActivityId ?? ""}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setSelectedActivityId(val ? parseInt(val) : 1);
                                                }}  
                                            >
                                                {!name ? 
                                                    activities.map((activity, index)=> (
                                                        <option key={index} value={activity.id}>
                                                            {firstLetterCapital(activity.name)}
                                                        </option>
                                                    )) : 
                                                    <option value={activity?.id}>{firstLetterCapital(activity?.name)}</option>
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <select 
                                                className="form-select" 
                                                aria-label="plans select"
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setSelectedPlanId(val ? parseInt(val) : 1);
                                                }} 
                                            >
                                                {!name ? 
                                                    plans.map((plan, index)=>(
                                                        selectedActivityId === plan.activity_id &&
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