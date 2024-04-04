import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import {HiOutlineUser} from "react-icons/hi2";
import { useNavigate } from "react-router";
import Logout from "../features/authentication/LogOut";

const StyledHeaderMenu = styled.ul`
  display : flex;
  align-items: center;
  gap:1.5rem;

 ` 
 function HeaderMenu() {
 const navigate =  useNavigate();
    return ( 
        <StyledHeaderMenu> 
            <li> 
              <ButtonIcon onClick={()=> navigate("/account")}>
                <HiOutlineUser/>
              </ButtonIcon> 
            </li>
            <li style={{marginRight:"2rem"}}>
                <Logout/>
            </li>
        </StyledHeaderMenu>
      );
 }

 export default HeaderMenu;