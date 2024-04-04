import {  getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constant";
import { useQuery, useQueryClient } from "@tanstack/react-query";
function useBookingTable() { 
   const [searchParams] = useSearchParams();
   const queryClient = useQueryClient();
   const sortingStatus = searchParams.get("status") ;
   const sortingSortBy = searchParams.get("SortBy")|| "startDate-desc";
   const filter = !sortingStatus || sortingStatus === "all" ?null : {field :"status" , value: sortingStatus , method:'eq'};

   const [field , direction] = sortingSortBy.split('-');
   const sorted = {field , direction};
   const page = !searchParams.get("page")?1:Number(searchParams.get("page"));
    const{isLoading , data:{data:bookings , count}={}, error} = useQuery({
        queryKey:['bookings' , filter ,sorted ,field , direction, page],
        queryFn: ()=> getBookings({filter , sorted , page}),
    })
   const pagecount = Math.ceil( count / PAGE_SIZE );
    if(page < pagecount){
     queryClient.prefetchQuery({
       queryKey:['bookings' , filter , page+1 , sorted],
       queryFn:()=>getBookings({filter , page:page+1 ,sorted })
       })
    }
    if(page >1){
     queryClient.prefetchQuery({
       queryKey:['bookings' , filter , page-1 , sorted],
       queryFn:()=>getBookings({filter , page:page-1 ,sorted })
       })
    }
    return {isLoading , bookings , count ,  error };
}

export default useBookingTable;

