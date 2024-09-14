/* eslint-disable react/no-unknown-property */

import { Link, useLoaderData } from 'react-router-dom';

const JobDetails = () => {
  const job = useLoaderData();
  console.log(job.images)

  return (
    <div className="p-16 pt-28 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Job Title : {job.title}</h1>
      <h2 className="text-xl font-semibold mb-2">Job Description: </h2>
      <p className="text-gray-700 mb-6">{job.description}</p>

      <h2 className="text-xl font-semibold mb-2">Responsibilities:</h2>
      <ul className="list-disc list-inside mb-6">
        {job.responsibilities}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Requirements:</h2>
      <ul className="list-disc list-inside mb-6">
        {job.requirements}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Benefits:</h2>
      <ul className="list-disc list-inside mb-6">
        {job.benefits}
      </ul>

      <p className="text-lg font-medium"><strong>Location:</strong> {job.location}</p>
      <div className='grid grid-cols-3 gap-2 my-3'>
        {job.images && job.images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Job related image ${index + 1}`} className='rounded-md' />
          </div>
        ))}

      </div>
      <Link to={`/jobs/apply/${job._id}`} class="relative  items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group">
        <span class="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-indigo-500 opacity-[3%]"></span>
        <span class="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-indigo-600 opacity-100 group-hover:-translate-x-8"></span>
        <span class="relative w-full text-left text-indigo-600 transition-colors duration-200 ease-in-out group-hover:text-white">Apply Now</span>
        <span class="absolute inset-0 border-2 border-indigo-600 rounded-full"></span>
      </Link>
    </div>
  );
};

export default JobDetails;
