import styled from "styled-components";
import { format, isToday } from "date-fns";
import Menus from "../../ui/Menus";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import { BsDashLg } from "react-icons/bs";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiDocumentArrowDown, HiEye } from "react-icons/hi2";
import {  useNavigate } from "react-router";
import useCheckOut from "../check-in-out/useCheckOut";
import useDeleteBooking from "./useDeleteBooking";
import { useState } from "react";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;
 function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests :{FullName:guestName , email},
    cabins: { name: cabinName },
  },
 }) {
  const navigate =useNavigate();
  const {CheckOut , isCheckingOut} =useCheckOut(); 
  const {DeleteBooking , isdeletingbooking} = useDeleteBooking()
  const [isDelete ,setIsDelete] =useState(false);

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>
      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>
      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>
      <Tag type={statusToTagName[status]}>{status?.length>1?status.replace("-", " "): <BsDashLg/>}</Tag>
      <Amount>{formatCurrency(totalPrice)}</Amount>
       <Menus.Menu> 
         <Menus.Toggle id={bookingId}/>
            <Menus.List id={bookingId}>
              <Menus.Button onClick={()=>navigate(`/bookings/${bookingId}`)}> <HiEye/>See Details </Menus.Button>
              { status === 'unconfirmed' && (
              <Menus.Button onClick={()=>navigate(`/checkin/${bookingId}`)}><HiArrowDownOnSquare/> Check in</Menus.Button>
              )}
              { status === 'checked-in' && (
              <Menus.Button onClick={()=>CheckOut(bookingId)} disabled={isCheckingOut}><HiArrowUpOnSquare/> Check Out</Menus.Button>
              )}   
              {
                status === 'checked-out' &&(
                  <Menus.Button onClick={()=>setIsDelete(true)}><HiDocumentArrowDown/>delete</Menus.Button>
                )
              }
           </Menus.List>
      </Menus.Menu>
      {
      isDelete && <Modal>
        <ConfirmDelete setShowform={setIsDelete} resourceName={[cabinName,bookingId]} onConfirm={DeleteBooking} disabled={isdeletingbooking}/>
      </Modal>
      }
    </Table.Row>
  );
}
export default BookingRow; 
