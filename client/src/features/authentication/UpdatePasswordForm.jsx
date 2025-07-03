
  import { useForm } from "react-hook-form";
  import Button from "../../ui/Button";
  import Form from "../../ui/Form";
  import FormRow from "../../ui/Error-row";
  import Input from "../../ui/Input"; 
  import { useUpdateUser } from "./useUpdateUser";
  import Row from "../../ui/Row";
  
 function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;
  const { UpdateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    UpdateUser({ password },{
      onSuccess: ()=>reset(), 
    });
    console.log('clicked');
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        /> 
      </FormRow>
      <Row type="Horizontal" end="true">
        <Button sizes="medium" onClick={reset} type="reset" variations="secondary">
          Cancel
        </Button>
        <Button sizes="medium" disabled={isUpdating} variations="primary">Update password</Button>
      </Row>
    </Form>
  );
}

export default UpdatePasswordForm;
