import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label"
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../redux/store';
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setUser } from '../../redux/authSlice';
import { Loader2 } from 'lucide-react';


const EditProfileModal = ({ open, setOpen }) => {


    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map((skill) => skill),
        file: user?.profile?.resume,
    });

    const dispatch = useDispatch();


    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("From data being submitted", input);

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);


        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(
                `${USER_API_ENDPOINT}/profile/update`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            if (res.data.success) {
              
                dispatch(setUser({ ...res.data.user, skills: input.skills }));
                toast.success("Profile Updated", res.data.success);

            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to update profile");
        }
        finally {
            setLoading(false);
        }
        setOpen(false)
        console.log(input)
    }

    const FileChangehandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[500px]"
                    onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle className="text-red-500">Edit Profile</DialogTitle>
                    </DialogHeader>

                    {/* Form for editing profile */}

                    <form onSubmit={handleSubmit}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <input type='text' value={input.fullname} id='name' name='fullname' onChange={changeEventHandler} className='col-span-3 border border-gr rounded-md p-2' />
                            </div>

                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <input type='email' id='email' name='email' value={input.email} onChange={changeEventHandler} className='col-span-3 border border-gr rounded-md p-2' />
                            </div>

                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="phone" className="text-right">
                                    Phone
                                </Label>
                                <input type='tel' id='phone' name='phoneNumber' value={input.phoneNumber} onChange={changeEventHandler} className='col-span-3 border border-gr rounded-md p-2' />
                            </div>

                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className="text-right">
                                    Bio
                                </Label>
                                <input type='text' id='bio' name='bio' value={input.bio} onChange={changeEventHandler} className='col-span-3 border border-gr rounded-md p-2' />
                            </div>

                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className="text-right">
                                    Skills
                                </Label>
                                <input type='text' id='skills' name='skills' value={input.skills} onChange={changeEventHandler} className='col-span-3 border border-gr rounded-md p-2' />
                            </div>

                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="resume" className="text-right">
                                    Resume
                                </Label>
                                <input type='file' id='file' name='file' accept='application/pdf' onChange={FileChangehandler} className='col-span-3 border border-gr rounded-md p-2' />
                            </div>
                        </div>

                        <DialogFooter>
                            {loading ? (
                                <Button className="w-full my-4">
                                    {" "}
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait {" "}
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full my-4 bg-blue-600 hover:bg-blue-700 cursor-pointer">Save</Button>
                            )}

                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default EditProfileModal
