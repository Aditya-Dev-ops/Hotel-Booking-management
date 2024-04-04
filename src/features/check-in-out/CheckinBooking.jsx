import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useParams } from "react-router";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmpaid , setConfirmpaid] =useState(false);
  const [addbreakfast , setAddbreakfast] = useState(false);
   const {checkin , ischeckingin} = useCheckin();
  const moveBack = useMoveBack();
   const {bookingid} = useParams();
   
   const {isLoading , BookingData:booking} = useBooking(bookingid)
  const {SettingsData , isLoading:isLoadingSettings} = useSettings();
   useEffect(()=>{
    setConfirmpaid(booking?.isPaid ?? false);
    setAddbreakfast(booking?.hasBreakfast ?? false);
   },[booking])

   if(isLoading || isLoadingSettings) return <Spinner/>;
   
   const {
     id: bookingId,
     guests,
     totalPrice,
     numGuests,
     hasBreakfast,
     numNights,
   } = booking;

    const optionalbreakfastprice = SettingsData?.BreakfastPrice * numNights * numGuests;
  function handleCheckin() {
    if(!confirmpaid) return;
    !addbreakfast?checkin({bookingId}):checkin({bookingId,breakfast:{hasBreakfast:true , extrasPrice: optionalbreakfastprice, totalPrice: totalPrice+optionalbreakfastprice }});
   } 
   return (
    <>
       <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
    { !hasBreakfast &&(
      <Box>
      <Checkbox
        checked={addbreakfast}
        onChange={()=>{
            setAddbreakfast((prev)=> !prev);
            setConfirmpaid(false);
           }
         }
        id="breakfast"> want to add breakfast? for {formatCurrency(optionalbreakfastprice)} 
      </Checkbox>
    </Box>
    )
   }
<Box>
  <Checkbox checked={confirmpaid} 
   onChange={()=> setConfirmpaid((confirm)=> !confirm)}
    id={bookingId}
    disabled={confirmpaid || ischeckingin}>
 I Confirm that {guests.FullName} has paid the total amount of { hasBreakfast?formatCurrency(totalPrice) :` ${formatCurrency(totalPrice + optionalbreakfastprice)} (${formatCurrency(totalPrice)} Room ${formatCurrency(optionalbreakfastprice)} Breakfast)`}
  </Checkbox>
 </Box>
      <ButtonGroup>
        <Button variations="primary" sizes="small" onClick={handleCheckin} disabled={!confirmpaid || ischeckingin}>Check in booking #{bookingId}</Button>
        <Button variations="secondary"sizes="small" onClick={moveBack}>
          Back 
        </Button> 
      </ButtonGroup> 
    </> 
  ); 
} 

export default CheckinBooking;
