import { faBars, faCircleExclamation, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Notification(){
    return(
        <div className="bg-navbar rounded" style={{ width: "350px" }}>
            <div className="border border-black rounded-top">
                <div className="d-flex justify-content-between pt-1 pb-2 px-2 align-items-center">
                    <span className="color-navbar form-text">Notifications</span>
                    <FontAwesomeIcon icon={faBars} color={'#BABBBD'} className="mt-1" />
                </div>
            </div>
            <div className="border border-0 rounded-bottom">
                <div className="d-flex justify-content-center align-items-center p-4">
                    <div>
                        <FontAwesomeIcon icon={faCircleExclamation} className="fs-3 text-center w-100 mx-auto" color={"#BABBBD"} /><br/>
                        <h5 className="color-navbar mt-2">Pas de nouvelle notifications</h5>
                    </div>
                </div>
                <div className="bg-notification p-2 text-end">
                    <Link to={'/'} className="btn btn-secondary">
                    <FontAwesomeIcon icon={faListCheck}/>
                        <span className="ms-2">Toutes les notifications</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}