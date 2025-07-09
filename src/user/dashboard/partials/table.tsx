export default function Table() {
    return (
        <div className="container mt-5 pb-5">
            <div className="row align-items-stretch">
                <div className="col-12 d-flex">
                    <div className="bg-white rounded border p-3 flex-fill">
                        <p className="fs-5">Les 10 Proches Réservations</p>
                        <hr />
                        <div className="table-responsive">
                        <table className="table table-striped border w-100">
                            <thead>
                                <tr>
                                    <th className="text-center">Date</th>
                                    <th className="text-center">Client</th>
                                    <th className="text-center">Vehicule</th>
                                    <th className="text-center">Technicien</th>
                                    <th className="text-center">Montant</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-center"></td>
                                    <td className="text-center"></td>
                                    <td className="text-center"></td>
                                    <td className="text-center"></td>
                                    <td className="text-center"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}