import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckOut() {
    const queryClient =  useQueryClient();
    const {mutate:CheckOut , isLoading:isCheckingOut }= useMutation({
        mutationFn:(bookingId)=>(updateBooking(bookingId,{
            status:'checked-out',
        })),
        onSuccess:(data)=>{
            toast.success(`Booking #${data.id} successfully checked out`);
            queryClient.invalidateQueries({active:true});
        },
        onError:(error)=> {
            toast.error(`something went wrong during check out`);
            console.error(error);
        }
    })
    return{CheckOut , isCheckingOut};
}

export default useCheckOut;