import { useMutation} from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

 function useLoginUser() {
  const navigate = useNavigate();
    const {mutate:LoginUserfnc ,isLoading:isLogin} = useMutation({
    mutationFn:({email,password})=> login({email ,password}),
    onSuccess:()=>{
         toast.success(`successfully signin`);
        navigate('/dashboard' , {replace:true});
    },
    onError: (err)=> {
        toast.error(`Provided email or password is incorrect`);
        console.error(err);
    }
 })
    return {LoginUserfnc , isLogin }
 }
 export default useLoginUser;

 