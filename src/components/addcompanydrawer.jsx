import React from 'react'
import {z} from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import UseFetch from "@/hooks/useEffect";
import { useEffect } from 'react'

import { Input } from "./ui/input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { addCompanies } from '@/api/apiCompanies'

const schema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  logo: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "image/png" || file[0].type === "image/jpeg"),
      {
        message: "Only Images are allowed",
      }
    ),
});

     const Addcompanydrawer = ({fetchCompanies}) => {
     const{register,handleSubmit,formState:{errors}}=useForm({
        resolver: zodResolver(schema),
        });

      const {
      loading:companyloading,
      fn: fnJobs,
      data:newcompanies,
      } = UseFetch(addCompanies);

      const submit= async (data)=>{
        fnJobs({
          ...data,
          logo:data.logo[0],
        })
      } 

      useEffect(()=>{
              if(newcompanies?.length>0) fetchCompanies();
      },[companyloading])
    
      return (
     <Drawer>
      <DrawerTrigger asChild>
  <Button variant="secondary" size="sm">
    Add Company
  </Button>
   </DrawerTrigger>

      <DrawerContent>
         <DrawerHeader>
            <DrawerTitle>Add a new company</DrawerTitle>
         </DrawerHeader>
          <form onSubmit={handleSubmit(submit)} className='flex gap-2 p-4 pb-0'>
             <Input
               placeholder='job-title' {...register("name")}/>
            
             <Input
             type="file"
             accept="image/*"
             className="file: text-gray-500"
              {...register("logo")}
            />
              
              <Button
              type="submit"
              variant='destructive'
              className="w-40">
                Add
              </Button>
          </form>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary" type="button">Cancel</Button>
            </DrawerClose>
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            {errors.logo && <p className="text-red-500">{errors.logo.message}</p>}

          </DrawerFooter>
        
      </DrawerContent>
    </Drawer>
  )
}

export default Addcompanydrawer