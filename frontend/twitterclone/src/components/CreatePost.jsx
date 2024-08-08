import axios from "axios";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import { TWEET_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets, getIsActive, getRefresh } from "../redux/tweetSlice";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const { user } = useSelector((store) => store.user);
  const { isActive } = useSelector((store) => store.tweet);
  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("id", user?._id);
      if (image) {
        formData.append("image", image);
      }

      const res = await axios.post(`${TWEET_API_END_POINT}/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setDescription("");
    setImage(null);
  };

  const forYouHandler = () => {
    dispatch(getIsActive(true));
  };

  const followingHandler = () => {
    dispatch(getIsActive(false));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="w-[100%]">
      <div className="flex items-center justify-around font-bold text-gray-600 text-lg border-b border-gray-200">
        <div
          onClick={forYouHandler}
          className={`${
            isActive ? "border-b-4 border-purple-700" : null
          } cursor-pointer hover:bg-gray-200 w-full text-center p-4`}
        >
          <h1>For you</h1>
        </div>
        <div
          onClick={followingHandler}
          className={`${
            !isActive ? "border-b-4 border-purple-700" : null
          } cursor-pointer hover:bg-gray-200 w-full text-center p-4`}
        >
          <h1>Following</h1>
        </div>
      </div>
      <div className="p-2">
        <div className="flex justify-center">
          <div>
            <Avatar
              src="https://tse1.mm.bing.net/th?id=OIP.caPhxrcO8w31TbfZLFgs0wHaHC&pid=Api&P=0&h=180"
              size="40"
              round={true}
            />
          </div>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full outline-none text-lg m-2"
            type="text"
            placeholder="What is happening"
          />
        </div>
        <div className="flex items-center justify-between py-3 border-b border-gray-300">
          <div>
            <label htmlFor="image-upload">
              <CiImageOn size={"24px"} className="cursor-pointer" />
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
          <button
            onClick={submitHandler}
            className="bg-[#8E24AA] px-3 py-1 border-none rounded-full text-lg text-white"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
