import { faBars, faBell, faCircleExclamation, faEye, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function AdminNotification(){
    return(
        <div className="bg-white border rounded" style={{ width: "350px" }}>
            <div className="rounded-top">
                <div className="text-center border-bottom py-2">
                    <span className="">Notifications</span>
                </div>
            </div>
            <a href="" className="d-flex align-items-center p-2 text-decoration-none notif-hover pb-2 border-bottom">
                <div className="w-15"><img src="/assets/images/users/avatar-place.png" alt="profile" className="img-fluid rounded" width="40" height="40" /></div>
                <div className="w-85 ms-2">
                    <div className="d-flex justify-content-between align-items-center align-items-start w-100">
                        <h6 className="text-dark">Admin</h6>
                        <h6 className="form-text color-navbar"> 1 jour</h6>
                    </div>
                    <div className="text-dark fs-7">
                        Service IT Management purchased by Super Admin for $667.00 via Bank Wire.
                    </div>
                </div>
            </a>
            <a href="" className="d-flex align-items-center p-2 text-decoration-none notif-hover pb-2 border-bottom">
                <div className="w-15"><img src="/assets/images/users/avatar-place.png" alt="profile" className="img-fluid rounded" width="40" height="40" /></div>
                <div className="w-85 ms-2">
                    <div className="d-flex justify-content-between align-items-center align-items-start w-100">
                        <h6 className="text-dark">Admin</h6>
                        <h6 className="form-text color-navbar"> 1 jour</h6>
                    </div>
                    <div className="text-dark fs-7">
                        Service IT Management purchased by Super Admin for $667.00 via Bank Wire.
                    </div>
                </div>
            </a>
            <a href="" className="d-flex align-items-center p-2 text-decoration-none notif-hover pb-2 border-bottom">
                <div className="w-15"><img src="/assets/images/users/avatar-place.png" alt="profile" className="img-fluid rounded" width="40" height="40" /></div>
                <div className="w-85 ms-2">
                    <div className="d-flex justify-content-between align-items-center align-items-start w-100">
                        <h6 className="text-dark">Admin</h6>
                        <h6 className="form-text color-navbar"> 1 jour</h6>
                    </div>
                    <div className="text-dark fs-7">
                        Service IT Management purchased by Super Admin for $667.00 via Bank Wire.
                    </div>
                </div>
            </a>
            <div className="d-flex justify-content-between p-2">
                <a href="" className="btn btn-primary">
                    <FontAwesomeIcon icon={faBell} className="fs-7" />
                    <span className="ms-2 fs-7">Marquer comme lut</span>
                </a>
                <a href="" className="btn bg-navbar">
                    <FontAwesomeIcon icon={faEye} className="fs-7" />
                    <span className="ms-2 fs-7">Voir tous</span>
                </a>
            </div>
        </div>
    )
}