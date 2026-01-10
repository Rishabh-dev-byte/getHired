import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";

import {updateApplicationStatus} from "@/api/apiApplications"
import UseFetch from "@/hooks/useEffect"

export function Applicationcard({application,isCandidate=false}) {
    const handleDownload=()=>{
         const link = document.createElement("a")
         link.href = application?.resume
         link.target = "_blank"
         link.click()
    }
     const {
    data: hiring,
    fn: fnstatus} = UseFetch(updateApplicationStatus, {
        candidate_id : application?.candidate_id,
  });

  const handleStatusChange = (status) =>{
    
    fnstatus(status).then(()=>{
      fnstatus()
    }
    
    )
  }
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="flex gap-2"> 
            {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}
            <Download
            size={18}
            className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
            onClick={handleDownload}
            />
            </CardTitle>
       
      </CardHeader>
      <CardContent className="flex flex-col">
      <div className="flex flex-col md:flex-row gap-3 justify-between">
        <div>
            <BriefcaseBusiness size={19} />{application?.experience} years of experience
        </div>
         <div>
            <School/> {application.education}
        </div>
         <div>
            <Boxes size={15} /> Skills: {application?.skills}
        </div>
      </div>
      </CardContent>
      <hr/>
      <CardFooter className="flex-col gap-2">
        <span>{new Date(application?.created_at).toLocaleString()}</span>
        {isCandidate?( <span className="capitalize font-bold">
            Status: {application.status}
          </span>):(
            <Select
            onValueChange={handleStatusChange}
            defaultValue={application.status}
          >
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Application Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="APPLIED">Applied</SelectItem>
              <SelectItem value="INTERVIEWING">Interviewing</SelectItem>
              <SelectItem value="HIRED">Hired</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>
          )}
      </CardFooter>
    </Card>
  )
}
