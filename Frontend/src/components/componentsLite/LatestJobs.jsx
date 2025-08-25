import React from 'react'
import JobCards from './JobCards';
import { useSelector } from 'react-redux';
import useGetAllJobs from '../../hooks/useGetAllJobs';


const LatestJobs = () => {

  useGetAllJobs();

  const  allJobs  = useSelector((state) => state.job?.allJobs || []);

  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold text-blue-600 '>
        Latest Jobs
      </h1>

      <div className='grid grid-cols-3 gap-4 my-5'>
        {
          allJobs.length === 0 ? (
            <span>No Job Available</span>
          ) : (
            allJobs
              .slice(0, 6)
              .map((job) =>
                job?._id ? (
                  <JobCards 
                   key={job._id} job={job} />
                ) : (
                  <span key={Math.random()}>Invalid Job Data</span>
                ))
          )
        }
      </div>
    </div>
  )
}

export default LatestJobs
