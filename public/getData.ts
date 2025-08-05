import { useEffect } from "react";
import axiosInstance from "../src/features/auth/axiosInstance";

export const getData = (link, setData) =>{
    useEffect(() => {
        const useGetData  = async () => {
            try {
                const response = await axiosInstance.get(link);
                if(response.data.status === 200){
                    setData(response.data.data);
                }else{
                    console.log(response.data.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        useGetData ();
    }, [link, setData]);
}