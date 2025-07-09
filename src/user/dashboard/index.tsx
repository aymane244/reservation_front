import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { fetchUser } from "../../features/auth/authSlice";
import Booking from "./partials/booking";
import Card from "./partials/card";
import Table from "./partials/table";

export default function Dashboard(){
    const dispatch = useDispatch<AppDispatch>();
    const { isLoaded } = useSelector((state: RootState) => state.auth);
    
    useEffect(() => {
        if(!isLoaded){
            dispatch(fetchUser());
        }
    }, [dispatch, isLoaded]);

    return(
        <div>
            <div className="bg-navbar" style={{ height: '150px' }}>
                <div className="container pt-4 pb-3">
                    <h5 className="text-white">Dashboard</h5>
                </div>
            </div>
            <Card/>
            <Booking/>
            <Table/>
        </div>
    )
}