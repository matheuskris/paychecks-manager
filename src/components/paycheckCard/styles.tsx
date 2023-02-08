import styled from "styled-components";

export const CardContainer = styled.div<{ active: boolean }>`
  background-color: gray;
  padding: 8px 12px;
  background-color: #224957;
  color: white;
  border-radius: 10px;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 1))
    drop-shadow(0 4px 3px rgb(0 0 0 / 1));
  transition: all 150ms ease-in-out;
  transform: ${(props) => (props.active ? "scale(1.04)" : "")};
  border: ${(props) => (props.active ? "1px solid white" : "")};

  &:hover {
    cursor: pointer;
    transform: scale(1.06);
  }
  &::after {
    content: "";
    width: 0;
    height: 0;
    border-top: ${(props) => (props.active ? "16px solid transparent" : "")};
    border-bottom: ${(props) => (props.active ? "16px solid transparent" : "")};
    border-left: ${(props) => (props.active ? "20px solid white" : "")};
    position: absolute;
    right: -10px;
    bottom: 50%;
    transition: all 150ms ease-in-out;
    transform: ${(props) =>
      props.active ? "translate(20px, 50%)" : "translateY(50%)"};
  }

  h1 {
    font-size: 18px;
    font-weight: 400;
  }
  p {
    font-size: 0.9rem;
    font-weight: 400;
  }

  .btnDownload {
    position: absolute;
    right: 10px;
    bottom: 25%;
    z-index: 20;
  }

  .icon {
    z-index: 0;
    color: ${(props) => (props.active ? "white" : "transparent")};
  }
`;
