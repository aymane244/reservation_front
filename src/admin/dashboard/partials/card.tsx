import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingDollar, faSackDollar, faTag, faUser, faUserCheck, faUserSlash, faUserTag, faUserXmark } from "@fortawesome/free-solid-svg-icons";

export default function AdminCard() {
    return (
        <div className="pt-3">
            <div className="row">
                <div className="col-lg-3 col-md-6 mt-2 d-flex">
                    <div className="bg-white rounded border p-3 w-100">
                        <div className="d-flex align-items-start">
                            <div className="bg-primary py-2 px-3 rounded">
                                <FontAwesomeIcon icon={faUser} color={'white'} />
                            </div>
                            <div className="ms-3">
                                <span>Total des Utilisateurs</span><br />
                                <span className="form-text">0</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mt-2 d-flex">
                    <div className="bg-white rounded border p-3 w-100">
                        <div className="d-flex align-items-start">
                            <div className="bg-primary py-2 px-3 rounded">
                                <FontAwesomeIcon icon={faUserCheck} color={'white'} />
                            </div>
                            <div className="ms-3">
                                <span>Utilisateurs actives</span><br />
                                <span className="form-text">0</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mt-2 d-flex">
                    <div className="bg-white rounded border p-3 w-100">
                        <div className="d-flex align-items-start">
                            <div className="bg-primary py-2 px-3 rounded">
                                <FontAwesomeIcon icon={faUserXmark} color={'white'} />
                            </div>
                            <div className="ms-3">
                                <span>Utilisateurs non vérifié</span><br />
                                <span className="form-text">0</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mt-2 d-flex">
                    <div className="bg-white rounded border p-3 w-100">
                        <div className="d-flex align-items-start">
                            <div className="bg-primary py-2 px-3 rounded">
                                <FontAwesomeIcon icon={faUserSlash} color={'white'} />
                            </div>
                            <div className="ms-3">
                                <span>Utilisateurs Blocqués</span><br />
                                <span className="form-text">0</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mt-2 d-flex">
                    <div className="bg-white rounded border p-3 w-100">
                        <div className="d-flex align-items-start">
                            <div className="bg-primary py-2 px-3 rounded">
                                <FontAwesomeIcon icon={faSackDollar} color={'white'} />
                            </div>
                            <div className="ms-3">
                                <span>Gains total</span><br />
                                <span className="form-text">0</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mt-2 d-flex">
                    <div className="bg-white rounded border p-3 w-100">
                        <div className="d-flex align-items-start">
                            <div className="bg-primary py-2 px-3 rounded">
                                <FontAwesomeIcon icon={faHandHoldingDollar} color={'white'} />
                            </div>
                            <div className="ms-3">
                                <span>plans vendus</span><br />
                                <span className="form-text">0</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mt-2 d-flex">
                    <div className="bg-white rounded border p-3 w-100">
                        <div className="d-flex align-items-start">
                            <div className="bg-primary py-2 px-3 rounded">
                                <FontAwesomeIcon icon={faTag} color={'white'} />
                            </div>
                            <div className="ms-3">
                                <span>Total de tickets</span><br />
                                <span className="form-text">0</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mt-2 d-flex">
                    <div className="bg-white rounded border p-3 w-100">
                        <div className="d-flex align-items-start">
                            <div className="bg-primary py-2 px-3 rounded">
                                <FontAwesomeIcon icon={faUserTag} color={'white'} />
                            </div>
                            <div className="ms-3">
                                <span>Tickets en attente</span><br />
                                <span className="form-text">0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}