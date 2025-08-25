import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Item } from '@radix-ui/react-radio-group'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../../redux/jobSlice'

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Mumbai",
      "Chennai",
      "Kolkata",
      "Pune",
      "Bangalore",
      "Hyderabad",
      "Ahemdabad",
      "Remote",
    ],
  },
  {
    filterType: "Technology",
    array: [
      "Mern",
      "React",
      "Data Scientist",
      "Fullstack",
      "Node.js ",
      "Python",
      "Java",
      "Frontend",
      "Backend",
      
    ],

  },

  {
    filterType: "Experience",
    array: ["0-1 year", "1-3 years", "3-5 years", "5-8 years", "8+ years"],
  },


]

const Filtercard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (value) => {
    setSelectedValue(value);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue])



  return (
    <div className='w-full bg-white rounded-md'>
      <h1 className='text-ld font-bold'>Filter Job</h1>
      <hr className='mt-3' />

      <RadioGroup value={selectedValue} onValueChange={handleChange}>
        {
          filterData.map((data, index) => (
            <div key={index}>
              <h1 className='text-ld font-bold'>{data.filterType}</h1>
              {
                data.array.map((item, indx) => {
                  const itemId = `Id${index} - ${indx}`;
                  return (
                    <div className='flex items-center space-x-2 my-2' key={item}>
                      <RadioGroupItem value={item} id={itemId}> </RadioGroupItem>
                      <label htmlFor={itemId}>{item}</label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default Filtercard
