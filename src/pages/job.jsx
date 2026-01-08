import React from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react';
import MDEditor from "@uiw/react-md-editor";
import UseFetch from "../hooks/useEffect.js"
import { getSinglejobs } from '@/api/apiJobs';
import { useEffect } from 'react';
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import { updateHiringStatus } from '@/api/apiJobs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplyJobDrawer } from '@/components/apply-jobs.jsx';

const JobPage = () => {
  const {id} = useParams();
  const {user,isLoaded} = useUser();
  
  const {
    data: job,
    fn: fnJobs} = UseFetch(getSinglejobs, {
        job_id : id
  });
   useEffect(() => {
     fnJobs();  
  },[isLoaded]);

   const {
    data: hiring,
    fn: fnstatus} = UseFetch(updateHiringStatus, {
        job_id : id
  });

  const handleStatusChange = (value) =>{
    const isOpen = value === "open" 
    fnstatus(isOpen).then(()=>{
      fnJobs()
    }
    
    )
  }
 

  return (
    <div  className='flex flex-col' >
      <div className='flex flex-col-reverse md:flex-row md:gap-7 justify-between items-center'>
        <h1 className='text-4xl font-extrabold'>{job?.title}</h1>
         <img src={job?.company?.logo_url} className="h-12" alt={job?.title} />
      </div>
    <div className='flex justify-between'>
      <div className='gap-6 flex'>
         <MapPinIcon /> {job?.location}
      </div>
      <div className='gap-6 flex' >
        <Briefcase /> {job?.applications?.length} Applicants
      </div>
      <div className='gap-3 flex'>
        {job?.isOpen?(<>
       <DoorOpen /> Open
      </>):( <><DoorClosed /> close</>)}
      </div>
       </div> 
         
         {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full ${job?.isOpen ? "bg-green-950" : "bg-red-950"}`}
          >
            <SelectValue
              placeholder={
                "Hiring Status " + (job?.isOpen ? "( Open )" : "( Closed )")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}
    
      
      <h2 className="text-1xl sm:text-xl font-bold pt-3 pl-5">About the job</h2>
      <p className="sm:text-lg pt-3 pl-5">{job?.description}</p>

      <h2 className="text-2xl sm:text-3xl font-bold pl-5 pt-3 pb-3">
        What we are looking for
      </h2>
     <MDEditor.Markdown
     source={job?.requirements}
     style={{ backgroundColor: "transparent" }}
     className="sm:text-lg pl-5"
     />
    {job?.recruiter_id !== user?.id && (
        <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={fnJobs}
          applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}
        />
      )}
      
    </div>
    
  )
}

export default JobPage