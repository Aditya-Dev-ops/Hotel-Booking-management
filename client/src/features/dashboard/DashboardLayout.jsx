import styled from "styled-components";
import { useRecentBooking } from "./useRecentBooking";
import { useRecentStays } from "./useRecentState";
import useCabinTable from "../cabins/useCabinsTable";
import Stats from "./Stats";
import Spinner from "../../ui/Spinner";
import SalesChart from "../dashboard/SalesChart";
import DurationChart from "./DurationChart";
import Today from "../check-in-out/TodayActivity";
 const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
 `;

 function DashboardLayout() {
  const {bookings , bookingsLoading } = useRecentBooking();
  const {confirmedStays , staysLoading ,numDays} = useRecentStays();
  const {cabins , isLoading } = useCabinTable();
  console.log(bookingsLoading || staysLoading || isLoading);
  if(bookingsLoading || staysLoading || isLoading) return <Spinner/>
  return ( 
    <StyledDashboardLayout>
      <Stats bookings={bookings} 
      confirmedStays={confirmedStays} 
      numDays={numDays}
      cabinCount={cabins.length}/>
      <Today/>
      <DurationChart confirmedStays={confirmedStays}/>
      <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
   );
}

export default DashboardLayout;