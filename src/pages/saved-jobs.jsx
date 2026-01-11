import React from 'react'
import UseFetch from "../hooks/useEffect.js"
import { getSavedJobs } from '@/api/apiJobs';
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import JobCard from "@/components/job-card";
const SavedJobs = () => {
  const {isLoaded} = useUser()
   const {
      loading:companyloading,
      fn: fnJobs,
      data:savedjob,
      } = UseFetch(getSavedJobs);

    useEffect(() => {
        if (isLoaded) {
          fnJobs();
        }
        }, [isLoaded]);
  return (
    <div> 
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Saved Jobs
      </h1>
      {companyloading === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedjob?.length ? (
            savedjob.map((saved) => {
              return (
                <JobCard
                  key={saved.id}
                  job={saved?.job}
                  onJobAction={fnJobs}
                  savedInit={true}
                />
              );
            })
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}
      </div>
    
    )

  }
export default SavedJobs