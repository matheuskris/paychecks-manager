import styled from "styled-components";

export const Table = styled.table`
  width: 95%;
  margin-inline: auto;
  border-collapse: collapse;
  box-shadow: -8px -8px 12px -12px rgb(0 0 0 / 29%);
  background-color: white;

  th {
    width: 8%;
    padding: 8px 0px;
  }

  tbody {
    tr:nth-of-type(2n) {
      background-color: rgb(0 0 0 / 11%);
    }
    td {
      text-align: center;
    }
  }
`;
