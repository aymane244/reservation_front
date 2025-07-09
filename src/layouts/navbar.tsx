import { useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router";
import { RootState } from "../app/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faCalendar, faCarSide, faClipboardList, faUsers } from "@fortawesome/free-solid-svg-icons";
import Notification from "./partials/notification";
import Setting from "./partials/setting";
import { useEffect, useRef, useState } from "react";


export default function Navbar(){
    const location = useLocation();
    const auth = useSelector((state: RootState) => state.auth.isAuthenticated);
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
            if(
                notificationWrapperRef.current &&
                !notificationWrapperRef.current.contains(event.target as Node) &&
                profileWrapperRef.current &&
                !profileWrapperRef.current.contains(event.target as Node)
            ){
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
        <div>
            <nav className="navbar navbar-expand-lg bg-navbar align-items-center border-bottom">
                <div className="container">
                    <span className="navbar-toggler border-0 pointer" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <FontAwesomeIcon icon={faBars} color={"white"}/>
                    </span>
                    <a className="navbar-brand color-navbar" href="#">Logo</a>
                    {auth ? (
                        <>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link active color-navbar ms-3" aria-current="page" href="#">
                                            <FontAwesomeIcon icon={faCarSide} />
                                            <span className="ms-2"></span>Gestion des véhicules
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active color-navbar ms-3" aria-current="page" href="#">
                                            <FontAwesomeIcon icon={faCalendar} />
                                            <span className="ms-2"></span>Mes Réservations
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active color-navbar ms-3" aria-current="page" href="#">
                                            <FontAwesomeIcon icon={faUsers} />
                                            <span className="ms-2"></span>Staff
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active color-navbar ms-3" aria-current="page" href="#">
                                            <FontAwesomeIcon icon={faClipboardList} />
                                            <span className="ms-2"></span>Support
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <ul className="d-flex me-auto mb-2 mb-lg-0 align-items-center mt-responsive">
                                <div className="nav-item me-4 ms-3 position-relative" ref={notificationWrapperRef}>
                                    <FontAwesomeIcon 
                                        icon={faBell} 
                                        className="pointer"
                                        onClick={handleNotification} 
                                    />
                                    <div className={`position-absolute end-0 mt-2 ${visibleNotification ? "d-block" : 'd-none'}`}>
                                        <Notification/>
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
                                        <Setting/>
                                    </div>
                                </div>
                            </ul>
                        </>
                    ) : (
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className={`${location.pathname === "/" ? 'active-navbar' : ''} nav-link`}>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className={`${location.pathname === "/register" ? 'active-navbar' : ''} nav-link`}>Register</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </nav>
            <Outlet />
        </div>
    );
}