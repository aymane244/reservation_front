import { useEffect, useState } from "react";
import { getData } from "../../../public/getData";
import Header from "../dashboard/partials/header";
import Plan from "./partials/plan";
import axiosInstance from "../../features/auth/axiosInstance";
import { firstLetterCapital } from "../../../public/helpers";

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
    limit: string,
    features: [],
}

export default function AdminPlans(){
    const [plans, setPlans] = useState<Plans[]>([]);
    const [selected, setSelected] = useState<string | null>(null);
    const [plan, setPlan] = useState(null);
    
    getData("api/plans/get", setPlans);

    const toggleSelected = (key: string) => {
        setSelected(key);
    };

    useEffect(() => {
        const getPlan = async () => {
            const response = await axiosInstance.post("api/plan/get", { name: selected });
            
            if(response.status === 200){
                setPlan(response.data.data);
            }
        }

        getPlan()
    }, [selected]);
    
    return(
        <div className="w-85 container-fluid">
            <Header/>
            <div className="container-fluid mt-3">
               <h5>Plans</h5>
               <div className="mt-5 border bg-white p-3 rounded">
                   <div className="d-flex justify-content-center">
                        {plans.map((plan, index)=> (
                            <button 
                                className="btn btn-primary mx-2 w-100" 
                                key={index}
                                onClick={() => toggleSelected(plan.name)}
                            >
                                {firstLetterCapital(plan.name)}
                            </button>
                        ))}
                    </div>
                    <Plan plan={plan} />
               </div>
            </div>
        </div>
    )
}