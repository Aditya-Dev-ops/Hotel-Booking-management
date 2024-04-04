import Form from '../../ui/Form';
import FormRow from '../../ui/Error-row';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from "../../ui/Spinner"
import {useUpdateSettings } from './useupdateSettingData';
function UpdateSettingsForm() {
  const {SettingsData , error , isLoading } = useSettings();
  const {updateSetting , isupdating}=useUpdateSettings(); 
  if(isLoading) return <Spinner/>;
 function handleupdate(e , field){ 
  const {value} = e.target;
   if (SettingsData[field] !== Number(value)) updateSetting({[field]:value}) ;
 }
  return (
    <Form >
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={SettingsData.minBookingLength} onBlur={(e)=> handleupdate(e, 'minBookingLength')} disabled={isupdating}/>
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={SettingsData.maxBookingLength}  onBlur={(e)=> handleupdate(e, 'maxBookingLength')}disabled={isLoading} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={SettingsData.maxGuestsPerBooking} onBlur={(e)=> handleupdate(e, 'maxGuestsPerBooking')}/>
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={SettingsData.BreakfastPrice} onBlur={(e)=> handleupdate(e, 'BreakfastPrice')}/>
      </FormRow>
    </Form>
  );
}
export default UpdateSettingsForm;
