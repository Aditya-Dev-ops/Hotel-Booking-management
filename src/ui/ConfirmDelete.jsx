import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import { useMoveBack } from "../hooks/useMoveBack";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled ,setShowform ,refresh=false}) {
const [name , Cabinid] = resourceName;
const moveBack = useMoveBack();
  console.log(...resourceName);
  console.log(Cabinid);
  function Run(){
  onConfirm(Cabinid);
  setShowform(false);
  refresh && moveBack();
}
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {name}</Heading>
      <p>
        Are you sure you want to delete this {name} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button variations="secondary" sizes="small" onClick={()=> setShowform(false)} disabled={disabled}>
          Cancel
        </Button>
        <Button variations="danger" sizes="small" onClick={Run} disabled={disabled}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
