import React from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";
import { MdOutlineDeleteOutline } from "react-icons/md";
const Tweet = ({tweet}) => {
  const {user}=useSelector(store=>store.user);
  const dispatch=useDispatch();
  //console.log(tweet.userDetails[0]?.name);
const likeOrDislikeHandler=async (id)=>{
  try {
    const res=await axios.put(`${TWEET_API_END_POINT}/like/${id}`,{id:user?._id},{
      withCredentials:true
    })
    dispatch(getRefresh());
    
      toast.success(res.data.message);
    
  } catch (error) {
    toast.success(error.response.data.message);
    console.log(error);
  }
}
const deleteTweetHandler= async (id)=>{
  try {
    axios.defaults.withCredentials=true;
    const res=await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
    console.log(res);
    dispatch(getRefresh());
    toast.success(res.data.message);
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
  }

}
  return (
    <div className="border border-gray-200">
      <div className="flex p-4  ">
        <div>
          <Avatar
            src="https://tse1.mm.bing.net/th?id=OIP.caPhxrcO8w31TbfZLFgs0wHaHC&pid=Api&P=0&h=180"
            size="40"
            round={true}
          />
        </div>
        <div className="ml-2 w-full ">
        <div className="flex items-center ">
        <h1 className="font-bold"> {tweet?.userDetails[0]?.name}</h1>
        <p className="text-gray-500 text-sm ml-1">{`@${tweet?.userDetails[0]?.username}`}</p>
        </div>

        <div>
            <p>{tweet?.description}</p>
        </div>
        <div className="flex justify-around my-3">
<div onClick={()=>likeOrDislikeHandler(tweet?._id)} className="flex items-center">
<AiOutlineLike size={"14px"}/>
<p>{tweet?.like?.length}</p>
</div>
<div className="flex items-center ">
<FaRegComment size={"14px"}/>
<p>1</p>

</div>
<div className="flex items-center">

<FaRegBookmark size={"14px"}/>
<p>0</p>
</div>
{
  user?._id===tweet?.userId && (
<div onClick={()=>deleteTweetHandler(tweet?._id)} className="flex items-center">

<MdOutlineDeleteOutline  size={"16px"}/>

</div>
  )
}


        </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
