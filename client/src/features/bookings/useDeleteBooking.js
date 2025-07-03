import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
    const queryClient = useQueryClient();
    const {mutate:DeleteBooking , isLoading:isdeletingbooking , error}=useMutation({
        mutationFn:(BookingId)=> deleteBooking(BookingId),
        onSuccess:(data)=>{
            toast.success(`Booking is Successfully Deleted`);
            queryClient.invalidateQueries({queryKey:["bookings"]})
        },
        onError:(error)=>{
            toast.error(`Something went wrong in deleting Booking`);
            console.error(error);
        }
    })
    return {DeleteBooking , isdeletingbooking};
}

export default useDeleteBooking;