import { StyledFormRow } from "../../ui/Error-row"; 
import { useForm } from "react-hook-form";
import {useCreateCabin ,useEditCabin }from "./useCreateCabin";// customized Hooks that we created for handle events in js files;
 import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/Error-row";

 function CreateCabinForm({setShowform,CabinEditData={}}) {
   const { id: editId , ...CabinData} = CabinEditData;  
   const isEditSession = Boolean(editId);
   const {createCabin} = useCreateCabin({setShowform});  
   const {EditCabin} = useEditCabin({setShowform});
   const {register , handleSubmit , getValues , formState} = useForm({
    defaultValues: isEditSession ? CabinData:{}
    });   
   const {errors} = formState; 
    console.log(errors); 
    function onSubmit(data){
      const image = typeof data.image === "string"? data.image : data.image[0]
      let newData = {...data , image:image};
     if(isEditSession) EditCabin({newData,id:editId});
     else createCabin(newData); 
      } 
      function onError(errors){ 
      console.log(errors); 
      } 
     return (
     <Form onSubmit={handleSubmit(onSubmit, onError)} type={"modal"}>
     <FormRow label={"Cabin name"} error={errors?.name?.message}>
      <Input type="text" id="name" {...register("name",{
           required:"this field is required",
         })}/> 
      </FormRow> 
     <FormRow label={"Maximum Capacity"} error={errors?.maxCapacity?.message} >
      <Input type="number" id="maxCapacity" {...register("maxCapacity",{
           required:"this field is required",
         })}/>  
     </FormRow>  
     <FormRow label={"Regular Price"} error={errors?.regularprice?.message} >
      <Input type="text" id="regularPrice" {...register("regularPrice",{
           required:"this Field is required",
         })}/>  
     </FormRow>  
     <FormRow label={"Discount"} error={errors?.discount?.message} >
      <Input type="number" id="discount" {...register("discount",{
        valueAsNumber:true , 
       max:{
        value:50 , 
        message: "Discount Can not be Exceed 50%"
       }
         })}/> 
     </FormRow>
     <FormRow label={"Description"} error={errors?.description?.message} >
      <Textarea type="number" id="description" {...register("description",{
           required:"this field is required",
         })}/> 
     </FormRow>
     <FormRow label={"Cabin Photo"} error={errors?.image?.message}  >
        <FileInput id="image" accept="image/*" {...register("image",{
        required: isEditSession? false : "this field is required",
         })}/>  
     </FormRow> 
       <StyledFormRow>
         <Button variations="secondary" type="reset" sizes="small" onClick={()=> setShowform(false)}>
           Cancel
         </Button>
         <Button  variations="primary" type="submit" sizes="small" >{isEditSession ?"Edit Cabin" :"Create cabin"}</Button>     
         </StyledFormRow>
     </Form> 
   );
 }
 export default CreateCabinForm; 



 