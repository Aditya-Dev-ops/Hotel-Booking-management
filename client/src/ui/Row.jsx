import styled, { css } from "styled-components";

const Row = styled.div`
display:flex;
gap:.5rem;
${(props)=> props.end ==='true' && css`
justify-content: end;
align-items: center;
margin-top: 1.2rem;
`}
${(props)=> props.type === "vertical" && css`
   flex-direction: column;
   gap:1.6rem;
`}
${(props)=> props.type === "Horizontal"||"horizontal" && css`
    justify-content: space-between;
    align-items:center;
`}
`;
Row.defaultProps = {
    type:"vertical",
}


export default Row; 