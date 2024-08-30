import React from 'react'
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios'

const Register = () => {
  const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [name, setname] = useState('')
    const [message, setmessage] = useState('')
    const user_register=async ()=>{
        
        try {
            const data = {
                name,
                email,
                password
            };

            const response = await axios.post('http://localhost:3000/register', data);
            setmessage(response.data.message)
        } catch (error) {
            console.error('Error:', err);
        }
    };
  return (
    <>
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800">Sign up</h2>
      <p className="text-sm text-center text-gray-600 mb-6 pt-3">
      Welcome! Please provide your information to create an account.      </p>
      <p className="text-sm text-center text-red-600 mb-4">{message}</p>
      <div className="space-y-6">
      <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your name"
            required
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="you@example.com"
            required
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="••••••••"
            required
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </div>
        <button
          className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={user_register}
        >
          Sign up
        </button>
      </div>
      <p className="mt-6 text-sm text-center text-gray-600">
      If you're already registered:{' '}
        <Link to={'/'} className="font-medium text-indigo-600 hover:text-indigo-500">
          Login
        </Link>
      </p>
    </div>
  </div>
  </>
  
  )
}

export default Register