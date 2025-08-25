import React, { useEffect, useState } from 'react'
import Navbar from '../componentsLite/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '../../utils/data'
import { useParams } from 'react-router-dom'
import { setAllApplicants } from "@/redux/applicationSlice";
import { useDispatch, useSelector } from 'react-redux'


const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const { applicants } = useSelector((store) => store.application);


    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
                    {
                        withCredentials: true,
                    }
                );
                dispatch(setAllApplicants(res.data.message.applications));
                console.log("Applicants Response:", res.data.message.applications);

            } catch (error) {
                console.log(error)
            }
        };
        fetchAllApplicants()

    }, []);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-10'> Applicants {applicants?.length || 0}</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants
