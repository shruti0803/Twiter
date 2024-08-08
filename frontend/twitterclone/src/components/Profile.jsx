import React from 'react'
import Avatar from 'react-avatar';
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import useGetProfile from '../hooks/useGetProfile'
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast"
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';
const Profile = () => {
  const {user, profile}=useSelector(store=>store.user);
  const {id}=useParams();
  useGetProfile(id);
  const dispatch=useDispatch();
  const followAndUnfollowHandler= async ()=>{
//follow
if(user.following.includes(id)){
try {
  axios.defaults.withCredentials=true;
  const res=await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {id:user?._id});
  console.log(res);
  dispatch(followingUpdate(id));
  dispatch(getRefresh());
  toast.success(res.data.message);
} catch (error) {
  console.log(error);
  toast.error(error.response.data.message);
}
}else{
  try {
    axios.defaults.withCredentials=true;
    const res=await axios.post(`${USER_API_END_POINT}/follow/${id}`, {id:user?._id})
    dispatch(followingUpdate(id));
    dispatch(getRefresh());
    toast.success(res.data.message);
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
}
  }
  return (
    <div className='w-[40%]'>
        <div className=' '>
<div className='flex items-center' >
    <Link to="/" className='rounded-full m-2 hover:bg-gray-200 '><IoMdArrowBack /></Link>
    <div>
    <h1 className='font-bold text-lg'>{profile?.name}</h1>
    <p className=''>10 Posts</p>
    </div>
</div>
<div className=''>
<img src="https://tse3.mm.bing.net/th?id=OIP.FIQtO7poOvF52JDIxnU1rAHaEK&pid=Api&P=0&h=180" className='w-full h-64'/>
</div> 
<div className=' ml-2 absolute top-52 border-white rounded-full'>
          <Avatar src="https://tse1.mm.bing.net/th?id=OIP.caPhxrcO8w31TbfZLFgs0wHaHC&pid=Api&P=0&h=180" size="150" round={true} />
         </div> 
         <div className='text-right m-4'>
          {
            profile?._id===user?._id?(
<button className='px-4 py-1  rounded-lg text-right  border border-gray-500 hover:bg-gray-200'>Edit Profile</button>
            ):(
              <button onClick={followAndUnfollowHandler} className='px-4 py-1  rounded-lg bg-black text-white text-right  border hover:cursor-pointer'>{user.following.includes(id)? "Following":"Follow"}</button>
            )
          }
          
         </div>
         <div className=" items-center m-4">
        <h1 className="font-bold"> {profile?.name}</h1>
        <p className="text-gray-500 text-sm ml-1">{`@${profile?.username}`}</p>
        </div>
        
  </div>
    </div>
  )
}

export default Profile