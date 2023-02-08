import styled from "styled-components";

interface ContainerProps {
  RH: boolean;
  func: boolean;
}

export const LoadingContainer = styled.div<ContainerProps>`
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: ${({ RH, func }) => (RH ? "150px" : func ? "100px" : "25px")};
    height: ${({ RH, func }) => (RH ? "150px" : func ? "100px" : "25px")};
  }
`;
