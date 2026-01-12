import supabaseClient from "../utils/supabase.js"



export async function getJobs(token,{location,company_id,searchQuery}){
  const supabase =  supabaseClient(token);
  

  let query =   supabase.from("job").select("*,saved: saved_job(id), company: companies(name,logo_url)");
  
   if(location){
    query=query.eq("location",location)
   }

   if(company_id){
    query=query.eq("company_id",company_id)
   }

    if(searchQuery){
   query = query.ilike("title", `%${searchQuery}%`);

   }
    
    const { data, error } = await query;
    if(error){
    console.log("the error is",error)
    return null
    }

    return data;
}


export async function saveJobs(token,{alreadySaved},saveData){
  const supabase = supabaseClient(token);
    
    if(alreadySaved){
      const { data, error:deleteError } = await supabase
       .from("saved_job")
       .delete()
       .eq("job_id",saveData.job_id)
      
       if(deleteError){
        console.log("the deleteError is",deleteError)
       }
       return data
    }
  
      else{
       const { data, error:insertError } = await supabase
       .from("saved_job")
       .insert([saveData])
       .select()
       
       if(insertError){
        console.log("the insertError is",insertError)
       }
       return data
       }

}

export async function getSinglejobs(token,{job_id}){
  const supabase =  supabaseClient(token);
    
    let query = supabase
    .from("job")
    .select(
      "*, company: companies(name,logo_url), applications: applications(*)"
    )
    .eq("id", job_id)
    .single();

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Job:", error);
    return null;
  }

  return data; 
}

export async function updateHiringStatus(token,{job_id},isOpen){
  const supabase =  supabaseClient(token);
    
    let query = supabase
    .from("job")
    .update({isOpen})
    .eq("id", job_id)
    .single();

  const { data, error } = await query;

  if (error) {
    console.error("Error updateHiringStatus Job:", error);
    return null;
  }

  return data; 
}

export async function addNewJob(token,_,jobData){
  const supabase = supabaseClient(token);
    
    
const { data, error:addjoberror } = await supabase
       .from("job")
       .insert([jobData])
       .select()
       
       if(savejoberror){
        console.log("the savejobError is",addjoberror)
       }
       return data
       }

        
       
       export async function getSavedJobs(token){
       const supabase = supabaseClient(token);
        const { data, error:getsavedjoberror } = await supabase
       .from("saved_job")
       .select("*,job:job(*,company:companies(name,logo_url))")
       
       if(getsavedjoberror){
        console.log("the getsavedjoberror is",getsavedjoberror)
       }
       return data
       }

      export async function getMyJobs(token, { recruiter_id }) {
       const supabase =  supabaseClient(token);

      const { data, error } = await supabase
      .from("job")
      .select("*, company: companies(name,logo_url)")
       .eq("recruiter_id", recruiter_id);

      if (error) {
       console.error("Error fetching Jobs:", error);
      return null;
       }

  return data;
}

export async function deleteJob(token, { job_id }) {
  const supabase =  supabaseClient(token);

  const { data, error: deleteError } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();

  if (deleteError) {
    console.error("Error deleting job:", deleteError);
    return data;
  }

  return data;
}