import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/Error-row";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import useSignup from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

 export function SignupForm() {
  const {register , formState , getValues , handleSubmit , reset}= useForm() ;
  const {errors} = formState;
  const {createuser , isusercreated} = useSignup();
  function submited({fullName , email , password}){
 createuser({fullName , email , password},
  {  
    onSettled:()=>reset(),
 })
  }
  return (
    <Form onSubmit={handleSubmit(submited)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text" id="fullName" {...register(
          "fullName",{
            required:"you must provide a full name"
          }
        )}/>
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" id="email" {...register(
          'email',{
            required:"you must provide a valid email ",
            pattern:{
              value: /\S+@\S+\.\S+/,
              message:"you must provide a valid email",
            }
          }
        )}/>
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" id="password" {...register(
          'password',{
            required:"you must provide a password ",
            minLength:{
              value:8 ,
              message:"password shoul be atleast 8 characters"
            }
          }
        )}/>
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" {...register(
          'passwordConfirm',{
            required:"this field is required ",
            validate: (value)=> getValues().password === value || "password nead to match"
          }
        )}/>
      </FormRow>

      <FormRowVertical type='horizontal' reverse={true}>
        {/* type is an HTML attribute! */}
        <Button variations="primary">Create new user</Button>
        <Button variations="secondary" type="reset" style={{margin:"0 .5rem"}} onClick={()=> reset()}>
          Cancel 
        </Button> 
      </FormRowVertical> 
    </Form>
  );
}

