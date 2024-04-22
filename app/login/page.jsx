"use client"

import { api } from '@/FrontEndLogic/Configer/config';
import { MyContext } from '@/FrontEndLogic/Context/AuthContext';
import React, { useContext, useRef } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';

function LoginForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useRouter()

  const {dispatch} = useContext(MyContext)

  const handleSubmit =async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const userData = {password , email}

    console.log('Email:', email);
    console.log('Password:', password);

    try {
      const response = await api.post('api/user/login', userData)
      console.log(response , 'responce');
      if (response.data.success) {
        toast.success(response.data.msg)
        // localStorage.setItem('MyToken',response.data.token)
        Cookies.set("MyToken", response.data.token, { expires: 7 });
        dispatch({type : "ADD_USER" , payload : response.data.user})
        navigate.push('/')
      }
    } catch (error) {
      console.log(error , 'iiii');
      toast.error(error.response.data.error)
      // console.log(error.response.data.error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 mb-96">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input type="email" id="email" ref={emailRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input type="password" id="password" ref={passwordRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <p className=' mb-3'>Forgot password : <Link className=' text-blue-400' href={'/forgot-password'}>Reset password</Link></p>
        <p className=' mb-3'>Create an account : <Link className=' text-blue-400' href={'/register'}> Register</Link></p>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
