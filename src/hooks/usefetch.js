import {useSession} from "@clerk/clerk-react"
import {useState}  from "react"

 function useFetch(cb,options={}){
    const[loading,setLoading] = useState(true)
    const[data,setData] = useState(null)
    const[error,setError] = useState(null)

    const { session } = useSession();
 
    const fn = async (...args)=>{
          setLoading(true);
          setError(null);
     
    try {
        let token = await session.getToken({
        template: "supabase",
      })
        const response =  await cb(token,options,...args) 
        setData(response)
        setError(null)
    } 
    catch (error) {
        setError("error")
    }
      finally{
        setLoading(false)
      }
      
    }
     return {data,fn,loading ,error};
};
 export default useFetch;
