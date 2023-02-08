import styled from "styled-components";
import { colors } from "../../../styles/styles.patterns";

export const HContainer = styled.div`
  height: 80px;
  width: 100%;
  background-color: ${colors.mainColor};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 20px;

  h1 {
    color: white;
    background-color: #224957;
    border-radius: 10px;
    padding: 7px 8px;
    filter: drop-shadow(0 2px 1px rgb(0 0 0 / 1))
      drop-shadow(0 2px 1px rgb(0 0 0 / 1));
  }
`;

export const BodyContainer = styled.main`
  padding-top: 30px;
  width: 100vw;
  min-height: calc(100vh - 80px);
  background: linear-gradient(#111111, #224957);
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 40px;
  overflow: hidden;

  .img {
    position: absolute;
    bottom: 0;
    height: auto;
    width: 100%;
  }

  .btnIcon {
    display: flex;
    height: 45px;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: all 100ms ease-in-out;
    padding-inline: 10px;
    border-radius: 15px;
    background-color: white;
    color: black;
    text-decoration: none;
    font-weight: 600;

    :hover {
      background-color: #cecece;
    }
    :active {
      transform: scale(0.9);
    }
  }
`;

export const CardsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 30%;
  padding: 0px 20px;

  h1 {
    font-size: 22px;
    color: white;
  }
`;

export const PdfContainer = styled.div`
  embed {
    width: calc(210 * 2.3px);
    height: calc(297 * 1.7px);
  }
`;
