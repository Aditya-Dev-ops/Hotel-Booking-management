import styled from "styled-components";
const FormRow = styled.div`
    display:flex;
    gap:0.8rem;
    flex-direction: ${props=> props?.type === 'horizontal'?"row":"column" };
    ${props =>  props?.reverse === true && "flex-direction:row-reverse"};
    margin-bottom: 1.2rem;
    padding: .7rem 0;
    `
 const Label = styled.label`
 `
function FormRowVertical({label , children , type , reverse}){

return(
     <FormRow type={type} reverse={reverse}>
        <Label type={type}>{label}</Label>
        {children}
     </FormRow>
    ) 
}
export default FormRowVertical;

