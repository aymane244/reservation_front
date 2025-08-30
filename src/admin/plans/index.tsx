import { useEffect, useState } from "react";
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

interface Plan{
    id: number,
    name: string,
    price: number,
    features: [],
}

interface Features{
    key: string,
    value: number,
    description: string,
    limit: string,
    features: [],
}

interface Activities{
    id: number,
    name: string
}

export default function AdminPlans(){
    const [activities, setActivities] = useState<Activities[]>([]);
    const [plans, setPlans] = useState<Plans[]>([]);
    const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);
    const [selectedPlanName, setSelectedPlanName] = useState<string | null>(null);
    const [plan, setPlan] = useState<Plan | null >(null);
    
    useEffect(() => {
        const getActivity = async () => {
            const response = await axiosInstance.get("api/activities/get");
                
            if(response.status === 200){
                setActivities(response.data.activities);
            }
        }
    
        getActivity()
    }, []);

    useEffect(() => {
        if(selectedActivityId === null){
            setPlans([]);
            setSelectedPlanName(null);
            setPlan(null);
            return;
        }

        const getPlansByActivity = async () => {
            try{
                // Assuming your API supports filtering plans by activity ID like this:
                const response = await axiosInstance.post("api/activity-plan/get", { id: selectedActivityId });

                if(response.status === 200){
                    setPlans(response.data.plans); // adapt to your actual response shape
                    setSelectedPlanName(null);
                    setPlan(null);
                }
            }catch(error){
                console.error("Error fetching plans:", error);
            }
        };

        getPlansByActivity();
    }, [selectedActivityId]);

    useEffect(() => {
        const getPlan = async () => {
            const response = await axiosInstance.post("api/plan/get", { name: selectedPlanName });
            console.log(response);
            
            if(response.status === 200){
                setPlan(response.data.data);
            }
        }

        getPlan()
    }, [selectedPlanName]);
    
    return(
        <div className="w-85 container-fluid">
            <Header/>
            <div className="container-fluid mt-3">
               <h2 className="my-4">Plans</h2>
               <div className="mt-5 border bg-white p-3 rounded">
                    <div className="row my-4 justify-content-center">
                        <div className="col-md-10">
                            <select
                                className="form-select"
                                aria-label="Activity Select"
                                value={selectedActivityId ?? ""}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSelectedActivityId(val ? parseInt(val) : null);
                                }}  
                            >
                                <option value="">-- Sélectionnez une activité --</option>
                                {activities.map((activity, index)=> (
                                    <option key={index} value={activity.id}>
                                        {firstLetterCapital(activity.name)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {selectedActivityId !== null && plans.length > 0 && (
                        <div className="d-flex justify-content-center">
                            {plans.map((planItem) => (
                                <button
                                    key={planItem.id}
                                    className={`btn w-auto px-4 mx-5 ${selectedPlanName === planItem.name ? "btn-primary" : "btn-outline-primary"}`}
                                    onClick={() => setSelectedPlanName(planItem.name)}
                                >
                                    {firstLetterCapital(planItem.name)}
                                </button>
                            ))}
                        </div>
                    )}
                    { selectedActivityId !== null && plan && plan.features.length > 0 ? (
    <Plan plan={plan} />
) : (
    <div className="text-center">
        Pas de fonctionnalité pour cette activité
    </div>
) }
               </div>
            </div>
        </div>
    )
}