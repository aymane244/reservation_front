import { useState } from "react";
import { getData } from "../../public/getData";
import { Link } from "react-router-dom";
import { firstLetterCapital } from "../../public/helpers";

interface Plans{
    id: number,
    name: string,
    price: number,
    features: Features[],
}

interface Features{
    key: string,
    value: number,
    description: string,
    features: [],
}

export default function Plan(){
    const [plans, setPlans] = useState<Plans[]>([]);

    getData("api/plans/get", setPlans);

    return (
        <div className="py-3">
            <div className="container p-0">
                <div className="row m-0">
                    {plans.map((plan, index)=>(
                        <div className="col-lg-4 col-md-3 col-12 shadow p-0" key={index}>
                            <div className="bg-secondary">
                                <h2 className="text-white text-center m-0 p-2">{firstLetterCapital(plan.name)}</h2>
                            </div>
                            <div className="border-bottom">
                                <h3 className="text-center p-2">
                                    <span className="text-primary">{plan.price}€</span>
                                    <span className="text-secondary">/mois</span>
                                </h3>
                            </div>
                            <div className="p-2">
                                <ul>
                                    {plan.features.map((feature,key) =>(
                                        <li key={key} className="mt-2 li-marker"><span className={`${feature.value === 1 ? "text-secondary" : "deactivate"}`}>{feature.description}</span></li>
                                    ))}
                                </ul>
                            </div>
                            <div className="text-center p-3">
                                <Link to={`/register/${plan.name.toLowerCase()}`} className="btn btn-primary text-center">S'abonner</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}