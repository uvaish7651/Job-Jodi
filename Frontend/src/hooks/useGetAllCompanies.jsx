import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { COMPANY_API_ENDPOINT } from '../utils/data';
import { useDispatch } from "react-redux";
import { setCompanies } from '../redux/companySlice';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {
                    withCredentials: true,
                });

                console.log("API Response:", res.data);

                if (res.data.success) {   
                    dispatch(setCompanies(res.data.companies));
                } else {
                    dispatch(setCompanies([])); 
                }
            } catch (error) {
                console.log("API Error:", error);
                setError(error.message || "An error occurred");
                dispatch(setCompanies([]));
            } finally {
                setLoading(false);
            }
        };
        fetchCompanies();
    }, [dispatch]);

    return { loading, error };
};

export default useGetAllCompanies;
