import React from 'react'

import { CiHome } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUser, getMyProfile, getOtherUsers } from '../redux/userSlice';
const LeftSidebar = () => {
  const {user}=useSelector(store=>store.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const logoutHandler= async()=>{
try {
  const res=await axios.get(`${USER_API_END_POINT}/logout`);
  dispatch(getUser(null));
  dispatch(getOtherUsers(null));
  dispatch(getMyProfile(null));
  navigate('/login');
  toast.success(res.data.message);
  
} catch (error) {
  console.log(error);
}
  }
  return (
    <div>
        <div>
            <div className='ml-8'>
                <img width={"84px"} src="logo.jpg"/>
            </div>
            <div className='my-4'>
                <Link to="/" className='flex items-center px-4 py-2 my-2 hover:bg-gray-100 hover:rounded-full cursor-pointer'>
<div> <CiHome size="24px"/></div>
               
                <h1 className='font-bold text-lg ml-2'>Home</h1>
                </Link>

                <div className='flex items-center px-4 py-2 my-2 hover:bg-gray-100 hover:rounded-full cursor-pointer'>
<div> <CiSearch size="24px"/></div>
               
                <h1 className='font-bold text-lg ml-2'>Explore</h1>
                </div>

                <div className='flex items-center px-4 py-2 my-2 hover:bg-gray-100 hover:rounded-full cursor-pointer'>
<div> <IoIosNotificationsOutline  size="24px"/></div>
               
                <h1 className='font-bold text-lg ml-2'>Notifications</h1>
                </div>

                <Link to={`/profile/${user?._id}`} className='flex items-center px-4 py-2 my-2 hover:bg-gray-100 hover:rounded-full cursor-pointer'>
<div> <CiUser size="24px"/></div>
               
                <h1 className='font-bold text-lg ml-2'>Profile</h1>
                </Link>

                <div className='flex items-center px-4 py-2 my-2 hover:bg-gray-100 hover:rounded-full cursor-pointer'>
<div> <CiBookmark size="24px"/></div>
               
                <h1 className='font-bold text-lg ml-2'>Bookmarks</h1>
                </div>

                <div onClick={logoutHandler} className='flex items-center px-4 py-2 my-2 hover:bg-gray-100 hover:rounded-full cursor-pointer'>
<div> <CiLogout size="24px"/></div>
               
                <h1 className='font-bold text-lg ml-2'>Logout</h1>
                </div>
                <button className=' px-4 py-2 border-none text-lg bg-[#8E24AA] w-full rounded-full font-bold text-white'> Post </button>
               
            </div>
        </div>
    </div>
  )
}

export default LeftSidebar