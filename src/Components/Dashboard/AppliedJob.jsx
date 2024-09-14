import { useState } from "react";
import useAppliedJob from "../../Hooks/useAppliedJob";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import toast from "react-hot-toast";

const AppliedJob = () => {
    const { appliedJob, loading: appliedLoading, refetch } = useAppliedJob();
    const [loadingId, setLoadingId] = useState(null);
    const [error, setError] = useState(null);
    const axiosSecure = useAxiosPrivate();
    //  ami cacce appliedJob a filter korta posterEmail diya 

    // Filter the appliedJob array based on posterEmail
    const filteredAppliedJobs = appliedJob?.filter(job => job.posterEmail);
    console.log(filteredAppliedJobs);
    const handleApprove = async (data) => {
        try {
            setLoadingId(data._id);
            setError(null);

            const response = await axiosSecure.put(`/appliedJob/${data._id}`, {
                status: 'active'
            });

            if (response.status === 200) {
                toast.success("Applicant approved successfully!");
                refetch();
            } else {
                setError(`Failed to approve applicant: ${response.statusText}`);
                toast.error(`Failed to approve applicant: ${response.statusText}`);
            }
        } catch (err) {
            setError('Failed to approve the applicant. Please try again.');
        } finally {
            setLoadingId(null);
        }
    };


    return (
        <div className="bg-white lg:w-auto p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">All Applicants</h3>
            {appliedLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="">
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-gray-600">
                                    <th className="py-2 pr-10 lg:pr-0 text-left">#</th>
                                    <th className="py-2 pr-10 lg:pr-0 text-left">Applicant Name</th>
                                    <th className="py-2 pr-10 lg:pr-0 text-left">Email</th>
                                    <th className="py-2 pr-10 lg:pr-0 text-left">Message</th>
                                    <th className="py-2 pr-10 lg:pr-0 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAppliedJobs?.map((data, index) => (
                                    <tr key={data._id} className="border-t text-gray-800">
                                        <td className="py-2 pr-10 lg:pr-0">{index + 1}</td>
                                        <td className="py-2 pr-10 lg:pr-0">{data.name}</td>
                                        <td className="py-2 pr-10 lg:pr-0">{data.email}</td>
                                        <td className="py-2 pr-10 lg:pr-0">{data.message}</td>
                                        <td>
                                            <button
                                                onClick={() => handleApprove(data)}
                                                disabled={data.status === 'active'}
                                                className={`p-2 rounded-lg ${data.status === 'active' ? 'bg-green-500' : 'bg-red-500'} ${data.status === 'active' ? 'cursor-not-allowed' : ''}`}>
                                                {/* {loadingId === data._id ? 'Approving...' : 'Approve'} */}
                                                {data.status === 'active' ? 'Approved' : 'Approve'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppliedJob;
