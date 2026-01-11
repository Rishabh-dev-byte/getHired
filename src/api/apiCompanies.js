import supabaseClient, { supabaseUrl } from "@/utils/supabase";


export async function getCompanies(token){
  const supabase = supabaseClient(token);
    let query =  await supabase.from("companies").select("*");
    const { data, error } = query;
    if(error){
    console.log("the error is",error)
    return null
    }

  return data;
}

export async function addCompanies(token,_,companydata){
  const supabase = supabaseClient(token);
    
     const random = Math.floor(Math.random() * 90000);
      const fileName = `logo-${random}-${companydata.name}`;
    
      const { error: storageError } = await supabase.storage
        .from("company-logo")
        .upload(fileName, companydata.logo);
    
      if (storageError) {
      console.error("STORAGE ERROR OBJECT ↓↓↓");
      console.error(storageError);
      throw storageError;
    }
    
      const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;
      
      const { data, error } = await supabase
        .from("companies")
        .insert([
          {
            name: companydata.name,
            logo_url,
          },
        ])
        .select();
    
      if (error) {
        console.error(error);
        throw new Error("Error submitting companies");
      }
    
      return data;
    
}