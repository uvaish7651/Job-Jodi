import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { JOB_API_ENDPOINT } from '../utils/data';
import { useDispatch, useSelector } from "react-redux";
import { setAllAdminJobs } from '../redux/jobSlice';



const useGetAllAdminJobs = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/getadminjobs`, {
                    withCredentials: true,
                });

                console.log("API Response:", res.data);

                if (res.data.status) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                
                console.log("API Error:", error);
                setError(error.message || "An error occurred");
            } finally {
                setLoading(false)
            }
        };
        fetchAllAdminJobs();
    }, [dispatch]);
    return { loading, error };
}


export default useGetAllAdminJobs
