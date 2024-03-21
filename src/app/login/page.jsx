'use client'
import axiosInstance from '@/config/AxiosIntercepter';
import React, { useState } from 'react';
import { navigate } from '../action';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';


const Login = () => {
  const Api = process.env.SERVICE_BASE_URL
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)

    try {
      const response = await axiosInstance.post(`${Api}/admin/login`, { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      localStorage.setItem('authToken', response.data.user.authToken)
      console.log(response.data.user)
      if (response.status === 200) {
        // console.log(response)
        setIsLoading(false)
        navigate(`/dashboard`)
        toast.success('Login Sucessful')
      } else {
        setIsLoading(false)
        toast.error('Login Failed')
        console.error('Login failed');
      }
    } catch (error) {
      setIsLoading(false)
      toast.error('Login Failed')
      console.error('Error occurred during login:', error);
    }
  };

  // Check if email and password are not empty
  const isDisabled = !(email && password);

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <form className='bg-[#182237] p-10 rounded-lg w-96 flex flex-col gap-7' onSubmit={handleSubmit}>
        <h1 className='text-2xl font-bold text-white'>Admin Login</h1>
        <input
          className='p-4 bg-[#151c2c] text-white border-2 border-solid border-[#2e374a] rounded'
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='p-4 bg-[#151c2c] text-white border-2 border-solid border-[#2e374a] rounded'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={`p-4 bg-teal-600 text-white border-none cursor-pointer rounded ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isDisabled} // Disable the button if email or password is empty
        >
          {isLoading ? (
            <div className='flex justify-center items-center'>
              <RotatingLines strokeColor="white" strokeWidth="4" animationDuration="0.75" width="25" visible={true} />
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
