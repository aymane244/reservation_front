import AdminDoughnutChart from "../../../components/charts/adminDoughnutChart";
import AdminLineChart from "../../../components/charts/adminLineChart";

export default function AdminChart() {
    return (
        <div className="mt-5">
            <div className="row align-items-stretch">
                <div className="col-lg-8 col-md-6 d-flex">
                    <div className="bg-white rounded border p-3 flex-fill">
                        <p className="fs-5">Total des Gains</p>
                        <hr />
                        <AdminLineChart/>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 d-flex">
                    <div className="bg-white rounded border p-3 flex-fill">
                        <p className="fs-5">Top des Plans Vendus</p>
                        <hr />
                        <AdminDoughnutChart/>
                    </div>
                </div>
            </div>
        </div>
    )
}