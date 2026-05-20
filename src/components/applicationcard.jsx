import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";

import { updateApplicationStatus } from "@/api/apiApplications";
import useFetch from "../hooks/usefetch";

export function Applicationcard({ application, isCandidate = false }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const { fn: fnstatus } = useFetch(updateApplicationStatus, {
    job_id: application?.job_id,
  });

  const handleStatusChange = (status) => {
    fnstatus(status);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-gray-200 dark:border-gray-800">

      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}
        </CardTitle>

        <Download
          size={18}
          className="cursor-pointer bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:scale-110 transition"
          onClick={handleDownload}
        />
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-4 text-sm">
        <div className="flex flex-col md:flex-row md:justify-between gap-4">

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <BriefcaseBusiness size={16} />
            <span>{application?.experience} years experience</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <School size={16} />
            <span>{application?.education}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Boxes size={16} />
            <span>{application?.skills}</span>
          </div>

        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-col items-start gap-3 border-t pt-4">
        <span className="text-xs text-gray-500">
          {new Date(application?.created_at).toLocaleString()}
        </span>

        {isCandidate ? (
          <span className="capitalize font-semibold text-sm">
            Status:{" "}
            <span className="text-blue-500">{application.status}</span>
          </span>
        ) : (
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
  );
}