import React, { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleJob } from '../../redux/jobSlice'
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from '../../utils/data'
import { toast } from "sonner";



const Description = () => {

    const params = useParams();
    const jobId = params.id;

   

    const { singleJob } = useSelector((store) => store.job);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useSelector((store) => store.auth);


    useEffect(() => {
        const fetchSingleJobs = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
                    withCredentials: true,
                });

                console.log("API Response:", res.data);


                if (res.data.status) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                } else {
                    setError("Failed to fetch jobs.");
                }
            } catch (error) {
                // console.log(error)
                // console.log("API Error:", error);
                console.error("Fetch Error:", error);
                setError(error.message || "An error occurred");
            } finally {
                setLoading(false)
            }
        };
        fetchSingleJobs();
    }, [jobId, dispatch, user?._id]);

    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;

    const [isApplied, setIsApplied] = useState(isInitiallyApplied);


    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
                { withCredentials: true }
            );
            if (res.data.success) {
                setIsApplied(true);
                const updateSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                }
            }
            dispatch(setSingleJob(updateSingleJob));
            console.log(res.data)
            toast.success(res.data.message);
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <div className='max-w-7xl mx-auto my-10'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                        <div className='flex gap-2 items-center mt-4'>
                            <Badge className="text-blue-600 font-bold" variant="ghost">
                                {singleJob?.position}
                            </Badge>
                            <Badge className="text-orange-600 font-bold" variant="ghost">
                                {singleJob?.salary} LPA
                            </Badge>
                            <Badge className="text-violet-600 font-bold" variant="ghost">
                                {singleJob?.location}
                            </Badge>
                            <Badge className="text-black font-bold" variant="ghost">
                                {singleJob?.jobType}
                            </Badge>
                        </div>
                    </div>

                    <div>
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`rounded-l-lg ${isApplied
                                ? "bg-gray-600 cursor-not-allowed"
                                : "bg-blue-400 hover:bg-blue-600"
                                }`}
                        >
                            {isApplied ? "Already Applied" : "Apply"}</Button>
                    </div>
                </div>

                <h1 className='border border-b-2 border-b-gray-400 font-medium my-4'>
                    {singleJob?.description}
                </h1>

                <div className='my-4'>
                    <h1 className='font-bold my-1'>
                        Role: {" "}
                        <span className='pl-4 font-normal text-gray-800'>
                            {singleJob?.position}
                        </span>
                    </h1>

                    <h1 className='font-bold my-1'>
                        Location: {" "}
                        <span className='pl-4 font-normal text-gray-800'>
                            {singleJob?.location}

                        </span>
                    </h1>

                    <h1 className='font-bold my-1'>
                        Salary: {" "}
                        <span className='pl-4 font-normal text-gray-800'>
                            {singleJob?.salary} LPA
                        </span>
                    </h1>

                    <h1 className='font-bold my-1'>
                        Experience: {" "}
                        <span className='pl-4 font-normal text-gray-800'>
                            {singleJob?.experience} Year
                        </span>
                    </h1>

                    <h1 className='font-bold my-1'>
                        Total Applicants: {" "}
                        <span className='pl-4 font-normal text-gray-800'>
                            {singleJob?.applications?.length || 0}
                        </span>
                    </h1>



                    <h1 className='font-bold my-1'>
                        Job Type: {" "}
                        <span className='pl-4 font-normal text-gray-800'>
                            {singleJob?.jobType}
                        </span>
                    </h1>

                    <h1 className='font-bold my-1'>
                        Post Date: {" "}
                        <span className='pl-4 font-normal text-gray-800'>

                            {(singleJob?.createdAt || "").split("T")[0]}

                        </span>
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Description
