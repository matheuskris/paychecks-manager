import styled from "styled-components";

export const Container = styled.div`
  padding: 24px 32px;
  display: flex;
  justify-content: center;
  box-shadow: 0 0 10px 2px;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .divFilterMenuIcon {
    display: flex;
    align-items: center;
    justify-content: right;

    p {
      font-size: 1.2rem;
      margin-right: 30px;
      white-space: nowrap;
    }

    input[type="date"] {
      margin-right: 30px;
      font-size: medium;
      padding: 1%;
      height: 40px;
    }

    button {
      width: 100px;
      height: 40px;
      margin-right: 30px;
      background-color: transparent;
      border: 1px solid black;
      border-radius: 5px;
      transition: all 0.15s ease-in-out;
      cursor: pointer;

      :hover {
        background-color: gray;
        color: white;
      }
    }
  }

  svg.menuBtn {
    cursor: pointer;
    width: 28px;
    height: 24px;
    text-align: right;
  }
`;
