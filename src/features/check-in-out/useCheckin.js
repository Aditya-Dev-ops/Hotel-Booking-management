import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
function useCheckin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
   const {mutate:checkin , isLoading:ischeckingin}=useMutation({
    mutationFn:(({bookingId , breakfast={}})=>updateBooking(bookingId ,{
     status:'checked-in',
     isPaid : true,
     ...breakfast,
    })), 
    onSuccess: (data)=>{
    toast.success(`Checked-In SuccessFully #${data.id}`);
    queryClient.invalidateQueries({active: true});
    navigate('/dashboard');
   },
   onError:(err)=> {
    toast.error('Something Went Wrong During Checke-In');
    console.error(err);
   },
 })  
 return {checkin , ischeckingin};   
}

export default useCheckin;