import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings(){
const queryclient = useQueryClient();
const {mutate:updateSetting , isLoading:isEditing} = useMutation({
    mutationFn:updateSettingApi,
    onSuccess:()=>{
        toast.success("Settings is Changed For Booking");
        queryclient.invalidateQueries({queryKey:["settings"]});
    },
    onError: ()=>{
        toast.error("Something went wrong");
    }
});
return {updateSetting , isEditing}; 
}

