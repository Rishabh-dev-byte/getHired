import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import { deleteJob, saveJobs } from "../api/apiJobs";
import useFetch from "../hooks/usefetch";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";

const JobCard = ({
  job,
  savedInit = false,
  onJobAction = () => {},
  isMyJob = false,
}) => {
  const [saved, setSaved] = useState(savedInit);
  const { user } = useUser();

  const { fn: fnSavedJobs } = useFetch(saveJobs, {
    alreadySaved: saved,
  });

  const handleSaveJob = async () => {
    await fnSavedJobs({
      user_id: user.id,
      job_id: job.id,
    });
    setSaved((prev) => !prev);
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
    <Card className="w-full max-w-md mx-auto rounded-xl shadow-sm hover:shadow-md transition">

      {/* Header */}
      <CardHeader className="flex flex-row justify-between items-start gap-2">
        <CardTitle className="text-base sm:text-lg font-semibold">
          {job?.title || "No title"}
        </CardTitle>

        {isMyJob && (
          <Trash2Icon
            size={18}
            className="text-red-400 cursor-pointer hover:scale-110 transition"
            onClick={handleDeleteJob}
          />
        )}
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-3 text-sm">
        
        {/* Company Logo */}
        {job?.company?.logo_url && (
          <img
            src={job.company.logo_url}
            className="h-8 object-contain"
            alt="company logo"
          />
        )}

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <MapPinIcon size={16} />
          <span>{job.location}</span>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
          {job.description}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-col sm:flex-row gap-3">

        <Link to={`/job/${job.id}`} className="w-full">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            variant="outline"
            className="w-full sm:w-12 flex items-center justify-center"
            onClick={handleSaveJob}
          >
            {saved ? (
              <Heart size={18} fill="red" stroke="red" />
            ) : (
              <Heart size={18} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;