import React, { useEffect, useState } from 'react'
import Navbar from '../componentsLite/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchJobByText } from '../../redux/jobSlice'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'

const AdminJobs = () => {
    useGetAllAdminJobs();


    const navigate = useNavigate();

    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchJobByText(input))
    }, [input]);

    return (
        <div>
            <Navbar />
            <div className=' max-w-7xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input className="w-fit" placeholder="Filter by Name & Jobs"
                        onChange={(e) => setInput(e.target.value)}
                    ></Input>
                    <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700" onClick={() => navigate("/admin/jobs/create")}>Post New Job</Button>
                </div>
                <div>
                    <AdminJobsTable />
                </div>
            </div>
        </div>
    )
}

export default AdminJobs







