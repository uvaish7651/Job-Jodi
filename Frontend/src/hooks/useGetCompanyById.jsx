import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { COMPANY_API_ENDPOINT } from '../utils/data';
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from '../redux/companySlice';



const useGetCompanyById = (companyId) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    useEffect(() => {
        const fetchSingleCompany = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`, {
                    withCredentials: true,
                });

                console.log("company", res.data.company);

                console.log("API Response:", res.data);

                if (res.data.status) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                
                console.log("API Error:", error);
                setError(error.message || "An error occurred");
            } finally {
                setLoading(false)
            }
        };
        fetchSingleCompany();
    }, [companyId, dispatch]);
    return { loading, error };
}

export default useGetCompanyById

