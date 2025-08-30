import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCarSide, faClipboardList, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function Card() {
    return (
        <div className="pt-5 m-card">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 mt-2">
                        <div className="bg-white rounded border p-3">
                            <div className="d-flex align-items-center">
                                <div className="bg-primary py-2 px-3 rounded">
                                    <FontAwesomeIcon icon={faCarSide} color={'white'} />
                                </div>
                                <div className="ms-3">
                                    <span>Total des véhicules Gérés</span><br />
                                    <span className="form-text">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mt-2">
                        <div className="bg-white rounded border p-3">
                            <div className="d-flex align-items-center">
                                <div className="bg-primary py-2 px-3 rounded">
                                    <FontAwesomeIcon icon={faCalendar} color={'white'} />
                                </div>
                                <div className="ms-3">
                                    <span>Réservations à venir</span><br />
                                    <span className="form-text">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mt-2">
                        <div className="bg-white rounded border p-3">
                            <div className="d-flex align-items-center">
                                <div className="bg-primary py-2 px-3 rounded">
                                    <FontAwesomeIcon icon={faUsers} color={'white'} />
                                </div>
                                <div className="ms-3">
                                    <span>Total des staffs</span><br />
                                    <span className="form-text">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mt-2">
                        <div className="bg-white rounded border p-3">
                            <div className="d-flex align-items-center">
                                <div className="bg-primary py-2 px-3 rounded">
                                    <FontAwesomeIcon icon={faClipboardList} color={'white'} />
                                </div>
                                <div className="ms-3">
                                    <span>Total tickets</span><br />
                                    <span className="form-text">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}