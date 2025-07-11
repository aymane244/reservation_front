import AdminBarChart from "../../../components/charts/adminBarChart";

export default function AdminTable(){
    return (
        <div className="mt-5 pb-5">
            <div className="row align-items-stretch">
                <div className="col-md-6 d-flex">
                    <div className="bg-white rounded border p-3 flex-fill">
                        <p className="fs-5">Derniers utilisateurs inscris</p>
                        <hr />
                        <div className="table-responsive">
                            <table className="table table-striped border w-100">
                                <thead>
                                    <tr>
                                        <th className="text-center">#</th>
                                        <th className="text-center">Client</th>
                                        <th className="text-center">Email</th>
                                        <th className="text-center">Date d'inscription</th>
                                        <th className="text-center">Action</th>
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
                <div className="col-md-6 d-flex">
                    <div className="bg-white rounded border p-3 flex-fill">
                        <p className="fs-5">Total Utilisateurs inscris</p>
                        <hr />
                        <AdminBarChart/>
                    </div>
                </div>
            </div>
        </div>
    )
}