import React, { useEffect } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import MDEditor from "@uiw/react-md-editor";
import { useUser } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";
import { State } from "country-state-city";

import { getCompanies } from "@/api/apiCompanies";
import { addNewJob } from "@/api/apiJobs";
import useFetch from "@/hooks/usefetch";
import Addcompanydrawer from "@/components/addcompanydrawer";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  company_id: z.string().min(1, { message: "Company is required" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
});

const PostJob = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      company_id: "",
      requirements: "",
    },
    resolver: zodResolver(schema),
  });

  const { data: companies, fn: fnCompanies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  const { fn: fnJobs } = useFetch(addNewJob);

  const submit = (data) => {
    fnJobs({
      ...data,
      recruiter_id: user.id,
      isOpen: true,
    }).then(() => navigate("/jobs"));
  };

  // Restrict access
  if (user?.unsafeMetadata.role !== "recruiter") {
    return <Navigate to="/jobs" />;
  }

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 py-6 max-w-4xl mx-auto">
      {/* Heading */}
      <h1 className="gradient-title font-extrabold text-3xl sm:text-5xl text-center pb-6">
        Post a Job
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col gap-5"
      >
        {/* Title */}
        <Input
          placeholder="Job Title"
          className="w-full"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}

        {/* Description */}
        <Textarea
          placeholder="Job Description"
          className="w-full min-h-[120px]"
          {...register("description")}
        />

        {/* Location + Company + Add */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Location */}
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Job Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {State.getStatesOfCountry("IN").map(({ name }) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {/* Company */}
          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Company">
                    {field.value
                      ? companies?.find(
                          (com) => com.id === Number(field.value)
                        )?.name
                      : "Company"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies?.map(({ name, id }) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {/* Add Company Button */}
          <div className="w-full sm:w-auto">
            <Addcompanydrawer fetchCompanies={fnCompanies} />
          </div>
        </div>

        {/* Errors */}
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location.message}</p>
        )}
        {errors.company_id && (
          <p className="text-red-500 text-sm">
            {errors.company_id.message}
          </p>
        )}

        {/* Markdown Editor */}
        <div className="w-full overflow-x-auto">
          <Controller
            name="requirements"
            control={control}
            render={({ field }) => (
              <MDEditor
                value={field.value}
                onChange={field.onChange}
                height={300}
              />
            )}
          />
        </div>

        {errors.requirements && (
          <p className="text-red-500 text-sm">
            {errors.requirements.message}
          </p>
        )}

        {/* Submit */}
        <Button
          type="submit"
          variant="blue"
          size="lg"
          className="w-full sm:w-fit mt-4"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PostJob;