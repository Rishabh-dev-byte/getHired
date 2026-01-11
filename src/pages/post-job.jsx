import React from 'react'
import {z} from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input";
import { getCompanies } from "@/api/apiCompanies";
import UseFetch from "@/hooks/useEffect";
import { useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import { Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from '@uiw/react-md-editor';
import { Button } from '@/components/ui/button';
import { addNewJob } from '@/api/apiJobs';
import { i } from '@clerk/clerk-react/dist/useAuth-fq1pQd_y';
import { Navigate, useNavigate } from 'react-router-dom';
const schema = z.object({
  title:z.string().min(1,{message:"title is required"}),
  Description:z.string().min(1,{message:"description is required"}),
  location:z.string().min(1,{message:"location is required"}),
  company_id:z.string().min(1,{message:"company_id is required"}),
  requirements:z.string().min(1,{message:"requirements is required"})
})

const PostJob = () => {
  const {isLoaded,user} = useUser()
  const navigate = useNavigate();
  const{register,handleSubmit,control,formState:{errors}}=useForm({
    defaultValues:{
      location:"",
      company_id:"",
      requirements:""
    },
      resolver: zodResolver(schema),
    });

     const {
      data: companies,
      fn: fnCompanies,
      } = UseFetch(getCompanies);

      useEffect(() => {
      if (isLoaded) {
        fnCompanies();
      }
      },[isLoaded]);

      const {
      loading:loading,
      fn: fnJobs,
      data:newcompanies,
      } = UseFetch(addNewJob);

      const submit=(data)=>{
        fnJobs({
          ...data,
          recruiter_id:user.id,
          isOpen:true
        })

      }

      useEffect(()=>{
        if(data?.length>0) navigate("/jobs");
      },[loading])
       
      if(user?.unsafeMetadata.role !== recruiter){
          return <Navigate to="/jobs"/>;
        }
  return (
    <div>
      <h1 className='gradient-title font-extrabold text-5xl sm:text-7xl text-centre pb-8 flex justify-center'>
       post a job
      </h1>
      <form onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-4 p-4 pb-0">
            <Input
            placeholder='job-title' {...register("title")}/>
            {errors.title && (<p className="text-red-500">{errors.title.message}</p>)}
            
            <Textarea placeholder="Job Description" {...register("description")} />
            {errors.Description && (
            <p className="text-red-500">{errors.description.message}</p>
        )}
     
     <div className="flex gap-4 items-center">
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
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
          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Company">
                    {field.value
                      ? companies?.find((com) => com.id === Number(field.value))
                          ?.name
                      : "Company"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies?.map(({ name, id }) => (
                      <SelectItem key={name} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <AddCompanyDrawer fetchCompanies={fnCompanies} />
        </div>
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
        {errors.company_id && (
          <p className="text-red-500">{errors.company_id.message}</p>
        )}
        <Controller
            name="requirements"
            control={control}
            render={({ field }) => (
              <MDEditor value={field.value} onValueChange={field.onChange}/>)}
           />
            {errors.requirements && (
          <p className="text-red-500">{errors.requirements.message}</p>
        )}

        <Button type="submit" variant='blue' size='lg' className="mt-2">

        </Button>
        </form>
    </div> 
  )
}

export default PostJob