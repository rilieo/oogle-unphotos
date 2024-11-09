import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="flex justify-between w-full">
        <h1 className="text-3xl font-bold">Oogle Unphotos</h1>
        <div>
            <button className="border mr-2 py-2 w-[80px] rounded bg-blue-500 hover:bg-blue-600 text-white">
                <Link to="/signup">Sign up</Link>
            </button>
            <button className="border py-2 w-[80px] rounded bg-blue-500 hover:bg-blue-600 text-white">
                <Link to="/login">Log in</Link>
            </button>
        </div>
    </div>
  )
}

export default Navbar