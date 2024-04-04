import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers"
import useDeleteCabin from "./useDeleteCabin";
import  { StyledFormRow } from "../../ui/Error-row";
import { BsDashLg } from "react-icons/bs";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  min-width: 30px;
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 700;
  color: var(--color-green-700);
`;

// creates_at: "2024-02-09T12:49:53"
// description: "Two Room set ideal For Couple"
// discount: 20
// id: 1
// image: "https://fuqkscoqzunexywvjoma.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg"
// maxCapacity: 2
// name: "001"
// regularPrice: 2200

function CabinRow({cabin}) {
  const [editshowform,setEditShowForm] = useState(false);
  const [isDelete ,setIsDelete] =useState(false);
  const {isDeleting , DeleteCabin} = useDeleteCabin();
  const {createCabin , iscreating} = useCreateCabin( {setShowform:setEditShowForm});
  const {
        name , maxCapacity ,
        regularPrice , discount , 
        image , id:Cabinid,description
    } = cabin;
    function handleDuplicates(){
   createCabin({
     name: `copy of ${name}`,
     maxCapacity,regularPrice,
     discount,image, description
   })
   }
  return (
    <>
    <Table.Row role="row">
      <Img src={image} alt="cabin-Image"/>
      <Cabin>{name}</Cabin>
      <div> Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{discount?discount+"%" :<BsDashLg />}</Discount>
      <StyledFormRow> 
      <Menus.Menu>
      <Menus.Toggle id={Cabinid}/>
      <Menus.List id={Cabinid}>
        <Menus.Button onClick={()=>handleDuplicates()}>Duplicate</Menus.Button>
        <Menus.Button onClick={()=> setEditShowForm((prev)=> !prev)} >Edit</Menus.Button>
        <Menus.Button onClick={()=>setIsDelete(true)}>Delete</Menus.Button>
      </Menus.List>
      </Menus.Menu>
       {/* <Button variations="secondary"  sizes="small"  disabled={iscreating}> {editshowform?"❌":"📝"}
      </Button>
      <Button variations="secondary"  sizes="small"  disabled={iscreating}> {"©️"}
      </Button> 
      <Button variations="secondary" type="reset" sizes="small"  disabled={isDeleting}>Delete
       </Button>  */}
      </StyledFormRow>
       </Table.Row>
       {editshowform && <Modal>  
       <CreateCabinForm setShowform={setEditShowForm} CabinEditData={cabin}/>
       </Modal>
       }  
     {
      isDelete && <Modal>
        <ConfirmDelete setShowform={setIsDelete} resourceName={[name,Cabinid]} onConfirm={DeleteCabin} disabled={isDeleting}/>
      </Modal>
      }
      </>
  );
}

export default CabinRow; 