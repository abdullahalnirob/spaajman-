import { useState } from 'react';
import { Link } from 'react-router-dom';
import useJobs from '../Hooks/useJobs';
import Loading from './Loading/Loading';

const JobList = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [jobs, loading] = useJobs();

  if (loading) return <Loading />

  const handleTagChange = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? [] : [tag]
    );
  };

  const filteredJobs = selectedTags.length === 0
    ? jobs
    : jobs?.filter(job => job.tags.includes(selectedTags[0]));

  return (
    <div className="p-16 pt-24">
      <h1  className="text-3xl font-bold mb-6 text-center">Available Jobs</h1>

      <div className="text-center mb-6">
        <button
          onClick={() => handleTagChange('Salon')}
          className={`py-2 px-4 rounded-lg mr-2 ${selectedTags.includes('Salon') ? 'bg-blue-600 text-white' : 'bg-blue-300 text-blue-800'}`}
        >
          Salon
        </button>
        <button
          onClick={() => handleTagChange('Spa')}
          className={`py-2 px-4 rounded-lg mr-2 ${selectedTags.includes('Spa') ? 'bg-blue-600 text-white' : 'bg-blue-300 text-blue-800'}`}
        >
          Spa
        </button>
        <button
          onClick={() => handleTagChange('Massage')}
          className={`py-2 px-4 rounded-lg mr-2 ${selectedTags.includes('Massage') ? 'bg-blue-600 text-white' : 'bg-blue-300 text-blue-800'}`}
        >
          Massage
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs?.map((job) => (
          <div key={job._id} className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-x-hidden">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">{job.title}</h2>
            <p className="text-gray-600 mb-1 text-sm font-medium">{job.location}</p>
            <p className="text-gray-700 mb-4">{job.description}</p>
            <div className="flex justify-between">
              <Link
                to={`/job-details/${job._id}`}
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 ease-in-out"
              >
                Details
              </Link>
              <Link
                to={`/jobs/apply/${job._id}`}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 ease-in-out"
              >
                Apply Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;