import { getMyJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/usefetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "./job-card";
import { useEffect } from "react";

const CreatedJobs = () => {
  const { user, isLoaded } = useUser(); // track loading state

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = useFetch(getMyJobs);

  useEffect(() => {
    if (isLoaded && user) { // ✅ wait until user is loaded
      fnCreatedJobs({ recruiter_id: user.id });
    }
  }, [isLoaded, user]);

  if (!isLoaded) return <div>Loading user...</div>; // optional loader

  return (
    <div>
      {loadingCreatedJobs ? (
        <BarLoader className="mt-4" width="100%" color="#36d7b7" />
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {createdJobs?.length ? (
            createdJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onJobAction={() => fnCreatedJobs({ recruiter_id: user.id })}
                isMyJob={true}
              />
            ))
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  );
};
 export default CreatedJobs;