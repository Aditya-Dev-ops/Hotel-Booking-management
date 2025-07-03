import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
function Logout(){
    const {logout , logingout} = useLogout();

return <ButtonIcon disabled={logingout} onClick={logout}>
{ !logingout? <HiArrowRightOnRectangle/>:<SpinnerMini/>}
</ButtonIcon>
}
export default Logout