import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings(){
const {data : SettingsData ,error,isLoading } = useQuery({
       queryKey:['settings'] ,
       queryFn:getSettings
    })
return { SettingsData ,error,isLoading};
}