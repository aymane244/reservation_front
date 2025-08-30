import { useEffect } from "react";
import axiosInstance from "../src/features/auth/axiosInstance";

export const getData = (link, setData, setOtherData) =>{
    useEffect(() => {
        const useGetData  = async () => {
            try{
                const response = await axiosInstance.get(link);
                console.log(response);
                
                if(response.data.status === 200){
                    setData(response.data.data);
                    setOtherData(response.data.activities);
                }else{
                    console.log(response.data.message);
                }
            }catch(error){
                console.error('Error fetching data:', error);
            }
        };

        useGetData ();
    }, [link, setData]);
}