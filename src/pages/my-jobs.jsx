import { useUser } from '@clerk/clerk-react'
import React from 'react'
import CreatedApplications from "../components/createdapplications.jsx"
import CreatedJobs from "../components/createdjobs.jsx"


const MyJobs = () => {
  const {user,isLoaded} = useUser()
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        {user?.unsafeMetadata?.role === "candidate"?"My Applications":"My Jobs"}
      </h1>
       {user?.unsafeMetadata?.role === "candidate"?(<CreatedApplications/>):(<CreatedJobs/>)}
    </div>
  )
}

export default MyJobs