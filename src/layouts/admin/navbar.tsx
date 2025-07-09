import { useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faBriefcase, faChevronRight, faCircleChevronRight, faClipboardCheck, faClipboardList, faPaperPlane, faScrewdriverWrench, faTag, faUserPen, faUsers, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import Notification from "../partials/notification";
import Setting from "../partials/setting";
import { RootState } from "../../app/store";


export default function AdminNavbar() {
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
        <div className="h-100 d-inline-block d-flex">
            <div className="p-3 border-end border-bottom border-2 laptop scrollable-container w-15 bg-navbar">
                <div className="offcanvas-body text-white">
                    <h3 className="text-center">Logo</h3>
                    <div className="mt-4 ms-2">
                        <div className="mb-3">
                            <a href="" className="d-flex text-decoration-none text-white p-2 active_admin link-hover">
                                <span className="me-2"><FontAwesomeIcon icon={faBars} /></span>
                                <span>Dashboard</span>
                            </a>
                        </div>
                        <div className="mb-1">
                            <h6 className="color-navbar mb-2">Gestion des utilisateurs</h6>
                            <a className="d-flex justify-content-between text-decoration-none text-white p-2 link-hover" data-bs-toggle="collapse" href="#collapseUsers" role="button" aria-expanded="false" 
                                aria-controls="collapseUsers"
                            >
                                <div className="d-flex">
                                    <span className="me-2"><FontAwesomeIcon icon={faUsers} /></span>
                                    <span>Utilisateurs</span>
                                </div>
                                <div><FontAwesomeIcon icon={faChevronRight} /></div>
                            </a>
                            <div className="collapse" id="collapseUsers">
                                <div className="mt-1 ms-4">
                                    <a href="" className="d-flex mb-1 p-2 link-hover text-decoration-none text-white">
                                        <span className="me-2"><FontAwesomeIcon icon={faCircleChevronRight} /></span>
                                        <span>Utilisateurs active</span>
                                    </a>
                                    <a href="" className="d-flex mb-1 p-2 link-hover text-decoration-none text-white">
                                        <span className="me-2"><FontAwesomeIcon icon={faCircleChevronRight} /></span>
                                        <span>Utilisateurs inactive</span>
                                    </a>
                                    <a href="" className="d-flex mb-2 p-2 link-hover text-decoration-none text-white">
                                        <span className="me-2"><FontAwesomeIcon icon={faCircleChevronRight} /></span>
                                        <span>Utilisateurs bannie</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <a href="" className="d-flex text-decoration-none text-white p-2 link-hover">
                                <span className="me-2"><FontAwesomeIcon icon={faPaperPlane} /></span>
                                <span>Envoyer une notification</span>
                            </a>
                        </div>
                        <div className="mb-1">
                            <h6 className="color-navbar mb-2">Gestion des Staff</h6>
                            <a href="" className="d-flex text-decoration-none text-white p-2 link-hover">
                                <span className="me-2"><FontAwesomeIcon icon={faUserTie} /></span>
                                <span>Staff</span>
                            </a>
                        </div>
                        <div className="mb-3">
                            <a href="" className="d-flex text-decoration-none text-white p-2 link-hover">
                                <span className="me-2"><FontAwesomeIcon icon={faUserPen} /></span>
                                <span>Rôles & Permissions</span>
                            </a>
                        </div>
                        <div className="mb-1">
                            <h6 className="color-navbar mb-2">Plans & Service</h6>
                            <a href="" className="d-flex text-decoration-none text-white p-2 link-hover">
                                <span className="me-2"><FontAwesomeIcon icon={faClipboardCheck} /></span>
                                <span>Plans</span>
                            </a>
                        </div>
                        <div className="mb-3">
                            <a href="" className="d-flex text-decoration-none text-white p-2 link-hover">
                                <span className="me-2"><FontAwesomeIcon icon={faBriefcase} /></span>
                                <span>Services</span>
                            </a>
                        </div>
                        <div className="mb-1">
                            <h6 className="color-navbar mb-2">Gestion de site</h6>
                            <a className="d-flex justify-content-between text-decoration-none text-white p-2 link-hover" data-bs-toggle="collapse" href="#collapseSite" role="button" aria-expanded="false" 
                                aria-controls="collapseSite"
                            >
                                <div className="d-flex">
                                    <span className="me-2"><FontAwesomeIcon icon={faScrewdriverWrench} /></span>
                                    <span>Paramètres</span>
                                </div>
                                <div><FontAwesomeIcon icon={faChevronRight} /></div>
                            </a>
                            <div className="collapse" id="collapseSite">
                                <div className="mt-1 ms-4">
                                    <a href="" className="d-flex mb-1 p-2 link-hover text-decoration-none text-white">
                                        <span className="me-2"><FontAwesomeIcon icon={faCircleChevronRight} /></span>
                                        <span>Paramètres</span>
                                    </a>
                                    <a href="" className="d-flex mb-1 p-2 link-hover text-decoration-none text-white">
                                        <span className="me-2"><FontAwesomeIcon icon={faCircleChevronRight} /></span>
                                        <span>Gestion des plugins</span>
                                    </a>
                                    <a href="" className="d-flex mb-1 p-2 link-hover text-decoration-none text-white">
                                        <span className="me-2"><FontAwesomeIcon icon={faCircleChevronRight} /></span>
                                        <span>Email Tamplates</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <a href="" className="d-flex text-decoration-none text-white p-2 link-hover">
                                <span className="me-2"><FontAwesomeIcon icon={faBell} /></span>
                                <span>Notifications</span>
                            </a>
                        </div>
                        <div className="mb-1">
                            <h6 className="color-navbar mb-2">Help Desk</h6>
                            <a className="d-flex justify-content-between text-decoration-none text-white p-2 link-hover" data-bs-toggle="collapse" href="#collapseTicket" role="button" aria-expanded="false" 
                                aria-controls="collapseTicket"
                            >
                                <div className="d-flex">
                                    <span className="me-2"><FontAwesomeIcon icon={faTag} /></span>
                                    <span>Tickets</span>
                                </div>
                                <div><FontAwesomeIcon icon={faChevronRight} /></div>
                            </a>
                            <div className="collapse" id="collapseTicket">
                                <div className="mt-1 ms-4">
                                    <a href="" className="d-flex mb-1 p-2 link-hover text-decoration-none text-white">
                                        <span className="me-2"><FontAwesomeIcon icon={faCircleChevronRight} /></span>
                                        <span>Tous les tickes</span>
                                    </a>
                                    <a href="" className="d-flex mb-1 p-2 link-hover text-decoration-none text-white">
                                        <span className="me-2"><FontAwesomeIcon icon={faCircleChevronRight} /></span>
                                        <span>Tickets en attente</span>
                                    </a>
                                    <a href="" className="d-flex mb-1 p-2 link-hover text-decoration-none text-white">
                                        <span className="me-2"><FontAwesomeIcon icon={faCircleChevronRight} /></span>
                                        <span>Tickets fermés</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    );
}