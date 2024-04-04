import { useMutation } from "@tanstack/react-query"
import { signup } from "../../services/apiAuth"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"

function useSignup() {
    const navigate = useNavigate();
    const {mutate:createuser , isLoading:isusercreated} = useMutation({
        mutationFn:({fullName , email , password})=>signup({fullName , email , password}),
        onSuccess:(data)=>{
            console.log(data);
            toast.success(`you ceated your account successfully`);
            navigate('/login');
        }, 
        onError:(error)=> {
            toast.error(`something went wrong in creating account`)
            console.error(error);
        }
    }) 
  return {createuser , isusercreated}
}

export default useSignup