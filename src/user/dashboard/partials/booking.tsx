import LineChart from "../../../components/charts/lineChart";

export default function Booking() {
    return (
        <div className="container mt-5">
            <div className="row align-items-stretch">
                <div className="col-lg-8 col-md-6 d-flex">
                    <div className="bg-white rounded border p-3 flex-fill">
                        <p className="fs-5">Mes Réservations</p>
                        <hr />
                        <LineChart/>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 d-flex">
                    <div className="bg-white rounded border p-3 flex-fill">
                        <p className="fs-5">Etat de Réservations de ce mois</p>
                        <hr />
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h2 className="text-primary">26</h2>
                                <h2 className="text-success">50</h2>
                            </div>
                            <div>
                                <div className="d-flex align-items-center">
                                    <div className="bg-primary p-2 rounded-circle mt-1"></div> 
                                    <span className="ms-2 fs-7">En attente de confirmation</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="bg-success p-2 rounded-circle mt-1"></div> 
                                    <span className="ms-2 fs-7">à venir</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}