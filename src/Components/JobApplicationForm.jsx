import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import toast from "react-hot-toast";


const JobApplicationForm = () => {
  const { _id, title, email } = useLoaderData();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const axiosCommon = useAxiosPublic();

  const onSubmit =async (data) => {
    try {
      const applyData = {
        posterEmail: email,
        posterId: _id,
        ...data
      }

      // Posting data to the server
      await axiosCommon.post('/appliedJob', applyData);
      toast.success('appliedJob successfully!');
      reset();
      navigate('/job-search');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-16 pt-28">
      <h1 className="text-2xl font-bold mb-4">Apply for Job: {title}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Your Name"
          className="block w-full mb-4 p-2 border"
          {...register('name', { required: true })}
        />
        <input
          type="email"
          placeholder="Your Email"
          className="block w-full mb-4 p-2 border"
          {...register('email', { required: true })}
        />
        <textarea
          placeholder="Why are you a good fit?"
          className="block w-full mb-4 p-2 border"
          rows="5"
          {...register('message', { required: true })}
        ></textarea>
        <button type='submit'

          className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 "
        >
          <span
            className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-20 group-hover:-translate-y-32 ease"
          ></span>
          <span
            className="relative text-indigo-600 transition duration-300 group-hover:text-black ease"
          >
            Apply Now
          </span>
        </button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
