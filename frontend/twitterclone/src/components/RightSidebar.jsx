import React from 'react';
import Avatar from 'react-avatar';
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';

const RightSidebar = ({ otherUsers }) => {

  return (
    <div className='w-full lg:w-[20%] lg:block hidden'>
      <div className='p-2 bg-gray-100 rounded-full outline-none flex items-center w-full'>
        <CiSearch className="text-gray-500" />
        <input type="text" placeholder="Search..." className='bg-transparent outline-none px-2 w-full' />
      </div>
      <div className='p-4 my-2 bg-gray-100 rounded-2xl'>
        <h1 className='font-bold text-lg mb-4'>Friends</h1>
        {otherUsers?.map((user) => {
          return (
            <div key={user?._id} className='flex gap-4 mb-4 items-center'>
              <Avatar src={user?.avatar || "https://tse1.mm.bing.net/th?id=OIP.caPhxrcO8w31TbfZLFgs0wHaHC&pid=Api&P=0&h=180"} size="40" round={true} />
              <div className="flex-grow">
                <h1 className="font-bold">{user?.name}</h1>
                <p className="text-gray-500 text-sm">{`@${user?.username}`}</p>
              </div>
              <Link to={`/profile/${user?._id}`}>
                <button className='font-bold bg-black text-white rounded-full px-4 py-2 hover:bg-purple-800 transition-colors'>Profile</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightSidebar;
