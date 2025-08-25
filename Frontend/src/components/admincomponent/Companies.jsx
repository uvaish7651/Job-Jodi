import React, { useEffect, useState } from 'react'
import Navbar from '../componentsLite/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '../../redux/companySlice'

const Companies = () => {
    const navigate = useNavigate();
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchCompanyByText(input))
    }, [input]);

    return (
        <div>
            <Navbar />
            <div className=' max-w-7xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input className="w-fit" placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    ></Input>
                    <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700" onClick={() => navigate("/admin/companies/create")}>Add Company</Button>
                </div>
                <div>
                    <CompaniesTable />
                </div>
            </div>
        </div>
    )
}

export default Companies
