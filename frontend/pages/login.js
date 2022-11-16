import Link from 'next/link'
import React from 'react'
import { BiLogIn } from 'react-icons/bi'
import Div from '../components/Div'

const Login = () => {

  const onSubmit = (e) => {
    e.preventDefault()

  }

  return (
    <Div>
      <div className="flex items-center h-[80vh] w-full">
        <div className="w-full bg-white rounded shadow-xl shadow-gray-700 p-8 m-4 md:max-w-lg md:mx-auto">
          <span className="block w-full text-xl capitalize font-bold mb-4">Admin Login</span>
          <form className="mb-4" onSubmit={onSubmit}>
            <div className="mb-4 md:w-full">
              <label for="email" className="block text-xs mb-1">Username or Email</label>
              <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="email" name="email" id="email" placeholder="Username or Email" />
            </div>
            <div className="mb-6 md:w-full">
              <label for="password" className="block text-xs mb-1">Password</label>
              <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="password" name="password" id="password" placeholder="Password" />
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">Login</button>
          </form>
          <Link className="text-blue-700 text-center text-sm" href="/login">Forgot password?</Link>
        </div>
      </div>
    </Div>
  )
}

export default Login
