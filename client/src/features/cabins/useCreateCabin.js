import toast from "react-hot-toast";
import { AddEditCabins } from "../../services/apicabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

 export function useCreateCabin({setShowform}) {
  const queryclient = useQueryClient();
    const {mutate:createCabin} = useMutation({
        mutationFn:AddEditCabins, 
        onSuccess: ()=>{   
        toast.success("cabin successfully created"); 
        setShowform(false);
        queryclient.invalidateQueries({queryKey:["cabins"]});
        },    
       onError:(error)=> toast.error(error.message),
       });  
    return {createCabin};
 }

 export function useEditCabin({setShowform}){
    const queryclient = useQueryClient();
    const {mutate:EditCabin} = useMutation({
        mutationFn: ({newData, id})=>AddEditCabins(newData,id),
        onSuccess: ()=>{   
        toast.success("cabin successfully Edited"); 
        setShowform(false);
        queryclient.invalidateQueries({queryKey:["cabins"]});
        },    
        onError:(error)=> toast.error(error.message),
        });   
    return {EditCabin};
 }