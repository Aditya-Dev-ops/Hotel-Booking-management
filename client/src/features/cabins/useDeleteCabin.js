import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DeleteCabin as deleteCabinApi } from "../../services/apicabins";

export default function useDeleteCabin (){
    const queryClient = useQueryClient();
    const {isLoading : isDeleting , mutate : DeleteCabin} = useMutation({
      mutationFn : deleteCabinApi,
      onSuccess: ()=>{ 
          toast.success("cabin successfully deleted");
       queryClient.invalidateQueries({
       queryKey:['cabins'],
      });
    },
      onError:(error)=> toast.error(error.message),
  }) 
  return {isDeleting , DeleteCabin};
}