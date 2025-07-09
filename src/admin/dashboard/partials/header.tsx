import { faBell, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import AdminNotification from "../../../layouts/admin/partials/notification";
import AdminSetting from "../../../layouts/admin/partials/setting";

export default function Header(){
    const user = useSelector((state: RootState) => state.auth.user);
    const [visibleNotification, setVisibleNotification] = useState(false);
    const [visibleProfile, setVisibleProfile] = useState(false);
    const notificationWrapperRef = useRef<HTMLDivElement>(null);
    const profileWrapperRef = useRef<HTMLDivElement>(null);
    
    const handleNotification = () => {
        setVisibleNotification((visible) => !visible);
        setVisibleProfile(false);
    }
    
    const handleProfile = () => {
        setVisibleProfile((visible) => !visible);
        setVisibleNotification(false);
    }
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                notificationWrapperRef.current &&
                !notificationWrapperRef.current.contains(event.target as Node) &&
                profileWrapperRef.current &&
                !profileWrapperRef.current.contains(event.target as Node)
            ) {
                setVisibleNotification(false);
                setVisibleProfile(false);
            }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-white w-100 p-3 rounded border">
            <div className="d-flex justify-content-between" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                <div className="bg-navbar py-2 px-3 rounded">
                    <FontAwesomeIcon icon={faGlobe} />
                    <span className="ms-2">Accueil</span>
                </div>
                <div className="d-flex align-items-center">
                    <div className="nav-item me-4 ms-3 position-relative" ref={notificationWrapperRef}>
                        <FontAwesomeIcon 
                            icon={faBell} 
                            className="pointer fs-5"
                            onClick={handleNotification} 
                        />
                        <div className={`position-absolute end-0 mt-2 ${visibleNotification ? "d-block" : 'd-none'}`}>
                            <AdminNotification/>
                        </div>
                    </div>
                    <div className="nav-item me-4 ms-3 d-flex align-items-start position-relative" ref={profileWrapperRef}>
                        <div 
                            className="pointer"
                            onClick={handleProfile}     
                        >
                            <span>
                                <img src="/assets/images/users/avatar-place.png" alt="profile" className="img-fluid rounded-circle" width="35" height="35" />
                            </span>
                            <span className="form-text color-navbar ms-2">
                                <strong>{user?.first_name} {user?.last_name}</strong>
                            </span>
                        </div>
                        <div className={`position-absolute end-0 mt-5 ${visibleProfile ? "d-block" : 'd-none'}`}>
                            <AdminSetting/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}