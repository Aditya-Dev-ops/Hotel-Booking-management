
import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
 function AddCabins(){
 const [showform , setShowform] = useState(false); 
 return( 
    <>
   <Button sizes="large" variations="primary" onClick={()=> setShowform((prev)=> !prev)} >{showform?"Close Form":"Add new cabin"}</Button>
   {showform && <Modal setShowform={setShowform}><CreateCabinForm setShowform={setShowform}/> </Modal>}
   </>
   )
} 

export default AddCabins;