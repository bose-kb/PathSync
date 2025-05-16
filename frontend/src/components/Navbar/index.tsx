import React from 'react';
import Button from '../Button';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 md:px-12 bg-white">
      <div className="text-2xl font-bold text-gray-800">PathSync</div>
      
      <div className="hidden md:flex space-x-8">
        <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
        <a href="#" className="text-gray-600 hover:text-gray-900">Courses</a>
        {/* <a href="#" className="text-gray-600 hover:text-gray-900">Deals</a>
        <a href="#" className="text-gray-600 hover:text-gray-900">Success</a> */}
        <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
        <a href="#" className="text-gray-600 hover:text-gray-900">Contact Us</a>
      </div>
      
      <div className="hidden md:block cursor-pointer">
        <Link to="/login"><Button primary={false}>Login</Button></Link>
      </div>
      
      <div className="md:hidden">
        <button className="text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;