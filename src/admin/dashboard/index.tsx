import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { fetchUser } from "../../features/auth/authSlice";
import Header from "./partials/header";
import AdminCard from "./partials/card";
import AdminChart from "./partials/chart";
import AdminTable from "./partials/table";

export default function AdminDashboard(){
    const dispatch = useDispatch<AppDispatch>();
    const { isLoaded } = useSelector((state: RootState) => state.auth);
    
    useEffect(() => {
        if(!isLoaded){
            dispatch(fetchUser());
        }
    }, [dispatch, isLoaded]);

    return(
        <div className="w-85 container-fluid">
            <Header/>
            <div className="container-fluid mt-3">
                <h5>Dashboard</h5>
                <AdminCard/>
                <AdminChart/>
                <AdminTable/>
            </div>
        </div>
    )
}