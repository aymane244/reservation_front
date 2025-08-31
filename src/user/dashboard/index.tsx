import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import Booking from "./partials/booking";
import Card from "./partials/card";
import Table from "./partials/table";
import { firstLetterCapital } from "../../../public/helpers";

export default function Dashboard(){
    const dispatch = useDispatch<AppDispatch>();
    const { isLoaded } = useSelector((state: RootState) => state.auth);
    const user = useSelector((state: RootState) => state.auth.user);
    // useEffect(() => {
    //     if(!isLoaded){
    //         dispatch(fetchUser());
    //     }
    // }, [dispatch, isLoaded]);
    console.log(user);
    
    return(
        <div>
            <div className="bg-navbar" style={{ height: '150px' }}>
                <div className="container pt-4 pb-5">
                    <div className="d-flex justify-content-between">
                        <h5 className="text-white">Dashboard</h5>
                        <div>
                            <div>Activité: <strong>{firstLetterCapital(user?.activity_name)}</strong></div>
                            <div>Plan: <strong>{firstLetterCapital(user?.plan_name)}</strong></div>
                            <div>Periode d'essai: <strong>{ user?.is_trial ? "Oui" : "Non" }</strong></div>
                            <div>Période d'essai expiration: <strong>{user?.expire_date ? new Date(user.expire_date).toLocaleDateString() : 'N/A'}</strong></div>
                        </div>
                    </div>
                </div>
            </div>
            <Card/>
            <Booking/>
            <Table/>
        </div>
    )
}