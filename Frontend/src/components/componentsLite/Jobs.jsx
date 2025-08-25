import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Filtercard from './Filtercard'
import Job from './Job'
import { useSelector } from 'react-redux'
import store from '../../redux/store'
import { motion } from 'framer-motion'


const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (!searchedQuery || searchedQuery.trim() === "") {
            setFilterJobs(allJobs);
            return;
        }

        const filteredJobs = allJobs.filter((job) => {
            const query = searchedQuery.toLowerCase();
            return (
                String(job?.title || "").toLowerCase().includes(query) ||
                String(job?.description || "").toLowerCase().includes(query) ||
                String(job?.location || "").toLowerCase().includes(query) ||
                String(job?.experience || "").toLowerCase().includes(query) ||
                String(job?.salary || "").toLowerCase().includes(query)
            );
        });
        setFilterJobs(filteredJobs);
    }, [allJobs, searchedQuery]);


    return (
        <div>
            <Navbar />

            <div className='max-w-7xl max-h-full mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <Filtercard />
                    </div>
                    {filterJobs.length <= 0 ? (
                        <span className=''>Job not found</span>
                    ) : (
                        <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                            <div className='grid grid-cols-3 gap-4'>
                                {filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.4 }}
                                        key={job._id}>
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Jobs
