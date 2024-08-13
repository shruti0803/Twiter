import React, { useState } from 'react';
import axios from "axios";
import { USER_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/userSlice';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  const dispatch=useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isLogin) {
        // Login
        res = await axios.post(`${USER_API_END_POINT}/login`, { email, password },{
          headers:{
            'Content-Type':"application/json"
          },
          withCredentials:true
        });

        dispatch(getUser(res?.data?.user));
        //console.log(res);



        if(res.data.success){
          navigate("/");
          toast.success(res.data.message);
        }
      } else {
        // Signup
        res = await axios.post(`${USER_API_END_POINT}/register`, { name, username, email, password },{
          headers:{
            'Content-Type':"application/json"
          },
          withCredentials:true
        });
      }
     
      if(res.data.success){
        setIsLogin(true);
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.log('Error response data:', error.response.data);
        console.log('Error response status:', error.response.status);
        console.log('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.log('Error request:', error.request);
      } else {
        console.log('Error message:', error.message);
      }
    }
  };

  const loginSignupHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='flex justify-evenly w-[80%]'>
        <div>
          <img
            className='ml-5'
            width={"324px"}
            src="logo.jpg"
            alt="Illustration"
          />
        </div>
        <div className='my-8 p-8 w-[450px] h-full bg-purple-100 border-4 rounded-xl'>
          {/* <h1 className='font-bold text-5xl my-4'>Happening now</h1> */}
          <form onSubmit={submitHandler} className='flex flex-col'>
            {!isLogin && (
              <>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Name'
                  className='border border-gray-700 outline-purple-400 rounded-full px-4 py-1 my-2'
                />
                <input
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='Username'
                  className='border border-gray-700 outline-purple-400 rounded-full px-4 py-1 my-2'
                />
              </>
            )}
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              className='border border-gray-700 outline-purple-400 rounded-full px-4 py-1 my-2'
            />
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className='border border-gray-700 outline-purple-400 rounded-full px-4 py-1 my-2'
            />
            <button className='bg-[#8E24AA] px-3 py-1 my-2 border-none rounded-full text-lg text-white'>
              {isLogin ? "Login" : "Create Account"}
            </button>
            <h1 className='ml-16'>
              {isLogin ? "Do not have an account? " : "Already have an account?"}
              <span className='cursor-pointer font-bold text-purple-500' onClick={loginSignupHandler}>
                {isLogin ? "Register" : "Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
