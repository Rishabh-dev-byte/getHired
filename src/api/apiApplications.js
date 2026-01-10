import supabaseClient, { supabaseUrl } from "@/utils/supabase";

// - Apply to job ( candidate )
export async function applyJobs(token, _, jobData) {
  console.log("applyJobs called");
console.log("jobData:", jobData);

  if (!jobData?.candidate_id) {
    throw new Error("Candidate ID missing");
  }
  const supabase =  supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume);

  if (storageError) {
  console.error("STORAGE ERROR OBJECT ↓↓↓");
  console.error(storageError);
  throw storageError;
}

  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error submitting Application");
  }

  return data;
}

export async function updateApplicationStatus(token,{candidate_id},status){
  const supabase =  supabaseClient(token);
    
    let query = supabase
    .from("applications")
    .update({status})
    .eq("candidate_id", candidate_id)
    .single();

  const { data, error } = await query;

  if (error) {
    console.error("Error updateApplicationStatus Job:", error);
    return null;
  }

  return data; 
}