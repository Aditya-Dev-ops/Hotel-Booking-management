import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import { useNavigate } from "react-router";
import useCheckOut from "../check-in-out/useCheckOut";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useState } from "react";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  
  const {isLoading , BookingData:booking} = useBooking();
  const {isCheckingOut , CheckOut} = useCheckOut();
  const {isdeletingbooking , DeleteBooking} = useDeleteBooking();
  const [isDelete ,setIsDelete] =useState(false);
  const navigate = useNavigate();

  const moveBack = useMoveBack();
  if(isLoading) return <Spinner/>
  const {status, id:bookingId ,cabins:{name:cabinName}}= booking;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  console.log(booking);
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variations="secondary" sizes="small" onClick={moveBack}>
          Back
        </Button>
        { status === 'unconfirmed' && (
            <>
              <Button variations="primary" sizes="small" onClick={()=>navigate(`/checkin/${bookingId}`)}> Check in</Button>
              <Button variations="danger" sizes="small" onClick={()=>setIsDelete(true)} disabled={isdeletingbooking}>delete</Button>
            </>
              )} 
        { status === 'checked-in' && (
              <Button variations="primary" sizes="small" onClick={()=>{CheckOut(bookingId);moveBack()}} disabled={isCheckingOut}> Check Out</Button>
              )} 
        {
           status === 'checked-out' &&(
              <Button variations="danger" sizes="small" onClick={()=>setIsDelete(true)} disabled={isdeletingbooking}>delete</Button>
              )
              }
      </ButtonGroup>
      {
      isDelete && <Modal>
        <ConfirmDelete setShowform={setIsDelete} resourceName={[cabinName,bookingId]} onConfirm={DeleteBooking} disabled={isdeletingbooking} refresh={true}/>
      </Modal>
      }
    </>
  );
}
export default BookingDetail;
