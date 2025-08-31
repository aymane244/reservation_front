import { faArrowRightFromBracket, faBars, faCircleExclamation, faListCheck, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { adminLogout } from "../../../features/auth/adminAuthSlice";
import adminAxios from "../../../features/auth/adminAxios";

export default function AdminSetting(){
    const dispatch = useDispatch<AppDispatch>()

    const handleLogout = async () => {
        try{
            const response = await adminAxios.post('/api/admin/logout');
            
            if(response.data.status === "success"){
                dispatch(adminLogout());
                window.location.href = '/admin/login';
            }
        }catch(error){
            console.error('Logout error:', error);
        }
    };

    return(
        <div className="bg-white rounded p-3 border" style={{ width: "180px" }}>
            <div className="mb-3">
                <Link to={'/'} className="color-navbar text-decoration-none">
                    <strong>
                        <FontAwesomeIcon icon={faUser}/>
                        <span className="ms-2">Mon Profile</span>
                    </strong>
                </Link>
            </div>
            <div className="pointer">
                <div className="color-navbar text-decoration-none" onClick={handleLogout}>
                    <strong>
                        <FontAwesomeIcon icon={faArrowRightFromBracket}/>
                        <span className="ms-2">Se déconnecter</span>
                    </strong>
                </div>
            </div>
        </div>
    )
}