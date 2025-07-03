import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";
function useBooking() {
    const {bookingId} = useParams();
     const {isLoading,  data:BookingData} = useQuery({
        queryKey:[bookingId],
        queryFn:()=>getBooking(bookingId)
     })
    return {isLoading , BookingData}
}

export default useBooking;