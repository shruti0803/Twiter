import React, { useEffect } from 'react'
import LeftSidebar from './LeftSidebar'
import Feed from './Feed'
import RightSidebar from './RightSidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import useOtherUsers from '../hooks/useOtherUsers'
import { useSelector } from 'react-redux'
import useGetMyTweets from '../hooks/useGetMyTweets'


const Home = () => {
 
const {user, otherUsers}=useSelector(store=>store.user);
const navigate=useNavigate();
useEffect(()=>{
  if(!user){
    navigate("/login");
  }
},[]);

useOtherUsers(user?._id);

useGetMyTweets(user?._id);
  // useOtherUsers();
  return (
    <div className='flex justify-around'>
        <LeftSidebar/>
        <Outlet/>
        <RightSidebar otherUsers={otherUsers}/>
    </div>
  )
}
export default Home
