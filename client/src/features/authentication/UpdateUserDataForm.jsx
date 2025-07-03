import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/Error-row.jsx";
import Input from "../../ui/Input";
import Row from "../../ui/Row.jsx";
import { useUser } from "./useUser.js";
import { useUpdateUser } from "./useUpdateUser.js";
import { useNavigate } from "react-router";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const navigate = useNavigate();
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();
const {UpdateUser , isUserUpdated} = useUpdateUser();
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
   if(!fullName) return;
    UpdateUser({fullName,avatar },{
      onSuccess: ()=>{
        setAvatar(null);
      }
    });
  }
  function handlecancel(){
    navigate(-1);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} id="email" disabled/>
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUserUpdated}
        />  
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUserUpdated}
       />
      </FormRow>
      <Row type="Horizontal" end="true"> 
        <Button  sizes="medium" type="reset" onClick={handlecancel} variations="secondary" disabled={isUserUpdated}>
          Cancel
        </Button>
        <Button sizes="medium" variations="primary" disabled={isUserUpdated}>Update account</Button>
      </Row> 
    </Form>
  );
}

export default UpdateUserDataForm;
