import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";



export function useUpdateUser(){
    const queryclient = useQueryClient();
    const {mutate:UpdateUser , isLoading:isUserUpdated} = useMutation({
        mutationFn: ({fullName , password , avatar})=>updateCurrentUser({fullName , password , avatar}),
        onSuccess: ()=>{   
        toast.success(`Your Profile has been updated successfully`); 
        queryclient.invalidateQueries({queryKey:["user"]});
        },    
        onError:(error)=> toast.error(error.message),
        });   
    return {UpdateUser , isUserUpdated};
 }