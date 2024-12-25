import React, { useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import Image from 'next/image';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import JobsCard from './JobsCard';

export default function Intro() {
  const [search, setSearch] = useState('');
  const jobData = useSelector(state => state.Job.JobData);
  const [filterJobs, setFilteredJobs] = useState([]);
  const [doneSearch, setDoneSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      setFilteredJobs([]);  // Reset jobs if search is empty
      setDoneSearch(false);
      return;
    }
    setLoading(true);
    const filteredJobs = jobData?.filter((job) => {
      let x = job?.job_category;
      return x?.toLowerCase().includes(search?.toLowerCase().trim());
    });
    setFilteredJobs(filteredJobs);
    setDoneSearch(true);
    setLoading(false);
  }

  return (
    <>
      <div className='w-full h-full flex items-center lg:justify-start py-24 justify-center flex-wrap'>
        <div className='lg:w-3/6 w-full sm:p-2 h-full my-2 flex items-center justify-center px-4 md:items-start md:justify-start md:p-20 flex-col'>
          <h1 className='md:text-6xl text-2xl sm:text-2xl font-extrabold mb-4 text-black'>
            To Choose <span className='text-indigo-600'>Right Jobs.</span>
          </h1>
          <p className='md:text-lg sm:text-sm text-xs mb-20 text-gray-400'>
            Join over 500 job seekers who use our platform to find the best opportunities every day. Hundreds of new job listings added daily!
          </p>
          <div className='bg-white flex-col mb-6 w-full md:px-4 py-4 flex sm:flex-row items-center justify-center'>
            <BiSearchAlt className='text-2xl text-indigo-600 mx-2 hidden sm:flex' />
            <input 
              onChange={(e) => setSearch(e.target.value)} 
              type="text" 
              placeholder='Search Jobs with Job categories like marketing ...' 
              className='xs:w-full w-3/4 h-full px-2 bg-gray-200 text-base py-3 outline-none' 
              aria-label="Search jobs by category" 
            />
            <button 
              onClick={handleSearch} 
              className='px-3 py-2 my-2 sm:my-0 border border-indigo-600 rounded uppercase tracking-widest mx-4 text-white bg-indigo-600 transition-all duration-700 hover:bg-transparent font-semibold text-base hover:text-indigo-600'
            >
              Search
            </button>
            <button 
              onClick={() => { setSearch(''); setFilteredJobs([]); setDoneSearch(false); }} 
              className="px-3 py-2 border border-gray-400 rounded ml-2"
            >
              Clear
            </button>
          </div>
          <div className='w-full px-2 py-2 flex items-center justify-start flex-wrap'>
            <div className='flex items-center justify-center'>
              <BsFillBookmarkFill className='text-indigo-600 text-xl mx-2' />
              <h1 className='font-semibold text-lg'>Popular Job Categories:</h1>
            </div>
            <div className='flex items-center justify-center px-4 flex-wrap'>
              <p className='px-4 py-2 bg-indigo-600 text-white rounded-md mx-2'>Software</p>
              <p className='px-4 py-2 bg-green-600 text-white rounded-md mx-2'>Marketing</p>
              <p className='px-4 py-2 bg-blue-600 text-white rounded-md mx-2'>UI/UX Design</p>
            </div>
          </div>
        </div>
        <div className='w-3/6 my-2 h-full bg-gray-200 hidden items-center justify-center flex-col p-20 lg:flex'>
          <Image width={600} height={700} src="/intro.png" alt="no-image-found" />
        </div>
      </div>
      {
        doneSearch && (
          <div className='w-full flex flex-wrap items-center justify-center py-2 px-2'>
            {loading ? (
              <p className="text-center text-indigo-600">Loading jobs...</p>
            ) : (
              Array.isArray(filterJobs) && filterJobs.length > 0 ? filterJobs.map((job) => (
                <JobsCard job={job} key={job?._id} />
              )) : (
                <p className='text-sm text-center font-semibold text-red-500'>Sorry, no such categories of jobs available right now</p>
              )
            )}
          </div>
        )
      }
      {/* Pricing Section */}
      <div className="w-full py-20 bg-gray-100 flex justify-center">
        <div className="w-5/6 lg:w-3/4 px-4">
          <h2 className="text-3xl text-center font-extrabold text-indigo-600 mb-8">Affordable Pricing Plans</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Plan */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Basic Plan</h3>
              <p className="text-gray-600 mb-4">Perfect for individuals just starting out.</p>
              <ul className="text-gray-500 mb-4">
                <li>✔ Access to 10 job applications/month</li>
                <li>✔ Email notifications</li>
                <li>✔ Basic support</li>
              </ul>
              <div className="text-lg font-semibold mb-6">₹0 / Month</div>
              <button className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all">
                Choose Plan
              </button>
            </div>

            {/* Standard Plan */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Standard Plan</h3>
              <p className="text-gray-600 mb-4">For growing professionals with added features.</p>
              <ul className="text-gray-500 mb-4">
                <li>✔ Access to 50 job applications/month</li>
                <li>✔ Priority email notifications</li>
                <li>✔ Save and bookmark jobs</li>
                <li>✔ Standard support</li>
              </ul>
              <div className="text-lg font-semibold mb-6">₹49 / Month</div>
              <button className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all">
                Choose Plan
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Premium Plan</h3>
              <p className="text-gray-600 mb-4">For teams and professionals with advanced features.</p>
              <ul className="text-gray-500 mb-4">
                <li>✔ Unlimited job applications</li>
                <li>✔ Real-time notifications</li>
                <li>✔ Dedicated account manager</li>
                <li>✔ Advanced analytics and insights</li>
                <li>✔ Premium support</li>
              </ul>
              <div className="text-lg font-semibold mb-6">₹99 / Month</div>
              <button className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all">
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-indigo-600 text-white py-12">
        <div className="w-5/6 lg:w-3/4 mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between mb-8">
            <div className="flex flex-col">
              <h3 className="text-2xl font-semibold mb-4">Company</h3>
              <ul>
                <li><a href="" className="hover:text-gray-200">About Us</a></li>
                <li><a href="" className="hover:text-gray-200">Careers</a></li>
                <li><a href="" className="hover:text-gray-200">Blog</a></li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h3 className="text-2xl font-semibold mb-4">Contact</h3>
              <ul>
                <li><a href="mailto:info@company.com" className="hover:text-gray-200">info@company.com</a></li>
                <li><a href="tel:+9123456789" className="hover:text-gray-200">+91 234 567 89</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm">&copy; 2024 hired Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
