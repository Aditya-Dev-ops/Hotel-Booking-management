import Button from "../../ui/Button";
import useCheckOut from "./useCheckOut";
function CheckoutButton({ bookingId }) {
  const {CheckOut , isCheckingOut } = useCheckOut();
  return (
    <Button variation="primary" 
    size="small" onClick={()=>CheckOut(bookingId)} 
    disabled={isCheckingOut}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
