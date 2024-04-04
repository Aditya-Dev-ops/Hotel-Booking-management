import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useRecentBooking() {
 const [searchParams] = useSearchParams();
 const numDays =!searchParams.get("last")? 7:Number(searchParams.get("last"));   
 console.log(numDays);  
 const queryDate = subDays(new Date() , numDays).toISOString();
console.log(queryDate);
 const {bookingsLoading , data:bookings , bookingserror}= useQuery({
    queryFn:() => getBookingsAfterDate(queryDate),
    queryKey:["bookings",`last-${numDays}`]
 });
 return {bookingsLoading , bookings , bookingserror}
}
