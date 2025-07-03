import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
 
export function useRecentStays() { 
 const [searchParams] = useSearchParams();
 const numDays =!searchParams.get("last")? 7:Number(searchParams.get("last"));   
 console.log(numDays);  
 const queryDate = subDays(new Date() , numDays).toISOString();
console.log(queryDate);
 const {staysLoading , data:stays , stayserror}= useQuery({
    queryFn:() => getStaysAfterDate(queryDate),
    queryKey:["stays",`last-${numDays}`]
 });
 const confirmedStays = stays?.filter(stays => stays.status === "checked-in" || stays.status === "checked-out" );

 return {staysLoading , confirmedStays , stayserror , numDays};
}
