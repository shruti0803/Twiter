import React from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'
import { useSelector } from 'react-redux'

const Feed = () => {
  const {tweets}=useSelector(store=>store.tweet);
  return (
    <div className='w-[40%] border border-gray-200'>
        <div>
        <CreatePost/>
        {tweets?.map((tweet)=> <Tweet key={tweet?._id} tweet={tweet}/>)

        }
       
       
        </div>
    </div>
  )
}

export default Feed