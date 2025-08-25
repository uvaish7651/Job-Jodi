import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { JOB_API_ENDPOINT } from '../utils/data';
import { setAllJobs } from "@/redux/jobSlice"
import { useDispatch, useSelector } from "react-redux";



const useGetAllJobs = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { searchedQuery } = useSelector((store) => store.job)



    useEffect(() => {
        const fetchAllJobs = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`, {
                    withCredentials: true,
                });

                console.log("API Response:", res.data);

                if (res.data.status) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                
                console.log("API Error:", error);
                setError(error.message || "An error occurred");
            } finally {
                setLoading(false)
            }
        };
        fetchAllJobs();
    }, [dispatch]);
    return { loading, error };
}

export default useGetAllJobs
