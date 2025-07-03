import { useMutation, useQueryClient } from "@tanstack/react-query";
import {logout as apilogout} from "../../services/apiAuth";
import { useNavigate } from "react-router";

export function useLogout(){
const navigate = useNavigate();
const queryClient = useQueryClient();
   const {mutate:logout , isLoading:logingout} = useMutation({
    mutationFn:apilogout,
    onSuccess: ()=>{
      queryClient.removeQueries();
      navigate('/login',{replace:true});
    }
   })
   return {logout , logingout}
}