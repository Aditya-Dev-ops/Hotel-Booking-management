import styled, { css } from "styled-components";


const Heading = styled.h1`
    color:#0b0202;
    padding: 1.5rem;
    border-radius: 1rem;
    ${(props)=> props.as === "h2" && css`
      font-size: 2rem;
      font-weight: 600;
      text-align: start;
      justify-content: center;
    `}
`;
 export const Heading4 = styled.h1`
    ${(props)=> props.as === "h4" && css`
        font-size:2.5rem;
        font-weight: 600;
        text-align: center;
        justify-content: center;
    `}
 `
 export default Heading;