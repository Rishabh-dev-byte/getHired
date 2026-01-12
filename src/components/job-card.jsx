import { Heart, MapIcon, MapPinIcon, Trash2Icon } from "lucide-react";
import {Button} from "./ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import {deleteJob,saveJobs} from "../api/apiJobs"
import useFetch from "../hooks/usefetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

const JobCard = ({
    job,
    savedInit=false,
    onJobAction = () => {},
    isMyJob = false,
     }) => {
     
        const[saved,setSaved] = useState(savedInit)
         const {user} = useUser()
          const{fn:fnSavedJobs,
           data:savedJobs,
           loading: saving
          }=useFetch(saveJobs,{
            alreadySaved:saved,
          })

          const handleSaveJob = async () => {
          await fnSavedJobs({
           user_id: user.id,
           job_id: job.id
       });
           setSaved(prev => !prev);
            onJobAction();
       };

           
            
             const { fn: fnDeleteJob } = useFetch(deleteJob, {
              job_id: job.id,
              });

     const handleDeleteJob = async () => {
       await fnDeleteJob();
       onJobAction();
           };
        return (
        <Card>
         <CardHeader>
         <CardTitle>
        {job?.title || "No title"}
         {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
              onClick={handleDeleteJob}
            />
          )}
         </CardTitle>
         </CardHeader>

         <CardContent>
            <div>
                {job && <img src={job.company.logo_url}className="h-6"/>}
            </div>
            <div className="flex gap-1 py-2">
                <MapPinIcon size={17} /> {job.location}
            </div>
            {job.description}
         </CardContent>
         <CardFooter className="flex gap-2 justify-center">
            <Link to={`/job/${job.id}`}> 
            <Button variant="secondary" className="w-80">
                More Details
                
            </Button>
            </Link>
           
            {!isMyJob && <Button
             variant="outline"
             className="w-10 "
             onClick={handleSaveJob}
             
             
            >{saved? (<Heart size={20} fill="red" stroke="red" />)
                :(<Heart size={20}  />)

              }
            </Button>

            }
         </CardFooter>
        
    </Card>
    
  )
}

export default JobCard