import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router";
import { useEffect } from "react";

  const Fullpage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;`

  function ProtectedRoute({children}) {
      //.1 Loading a Authenticated user
      const {isLoading ,user} = useUser();
      const navigate = useNavigate();  
      //2.if there is no user Redirect to the Login Page 
      console.log(isLoading , !isLoading , user , !user); 
      useEffect(()=>{ 
        console.log(!isLoading && !user);
        if(!isLoading && !user) navigate('/login');    
        },[user , isLoading , navigate]);
      //3. while loading return spinner
      if(isLoading) return (
          <Fullpage>
            <Spinner/>
          </Fullpage>
      );
      return children;
  }

  export default ProtectedRoute;