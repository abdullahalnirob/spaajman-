import { useState, useEffect, useCallback } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useAppliedJob = () => {
    const [appliedJob, setAppliedJob] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic();

    const fetchAppliedJob = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosPublic.get("/appliedJob");
            setAppliedJob(response.data);
        } catch (error) {
            console.error("Error fetching applied jobs:", error);
            setError("Failed to fetch applied jobs. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [axiosPublic]);

    useEffect(() => {
        fetchAppliedJob();
    }, [fetchAppliedJob]);

    return { appliedJob, loading, error, refetch: fetchAppliedJob };
};

export default useAppliedJob;
