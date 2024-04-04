import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical  from "../../ui/FormRowVertical";
import useLoginUser from "./useLogin";
import { Link } from "react-router-dom";
 function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const {LoginUserfnc , isLogin }=useLoginUser();
  function handleSubmit(e) { 
    e.preventDefault(); 
    if(!email || !password) return ;
    console.log(email , password);
    LoginUserfnc({email , password}, {
      onSettled:()=>{
        setEmail("");
        setPassword("");
      }
    });
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> 
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button style={{padding:".3rem"}}  variations='primary' size="large" disabled={isLogin}>Login</Button>
        <p style={{textAlign:"center"}}>or</p>
        <Link to="/users" style={{padding:".3rem 2rem" , textAlign:"center", backgroundColor:"#6366f1" , border:"#f9fafb" , hover:{backgroundColor:"#f9fafb"}, borderRadius:"0.5rem" , color:"#fff"} }> create user</Link>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
