import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { APPLICATION_API_ENDPOINT } from '../utils/data';
import { setAllAppliedJobs } from '../redux/jobSlice';

const useGetAllAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
        withCredentials: true,
        });
        console.log("API Response", res.data)
       if (res.data.success) {
         dispatch(setAllAppliedJobs(res.data.application));
       }
      } catch (error) {
        console.log(error)
      }
    };
    fetchAppliedJobs()
  }, [dispatch]);
  return null;
}

export default useGetAllAppliedJobs;
