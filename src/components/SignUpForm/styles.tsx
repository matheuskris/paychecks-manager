import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(#111111, #224957);
  display: flex;
  justify-content: center;
  align-items: center;

  .img {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 1;
  }
`;

export const FormContainer = styled.div`
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  legend {
    height: 80px;
    font-size: 64px;
    color: #ffffff;
    font-weight: 400;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
  }

  input {
    width: 300px;
    height: 45px;
    border-radius: 10px;
    background-color: #224957;
    outline: none;
    margin-bottom: 32px;
    border: none;
    padding: 0 8px;
    color: white;

    @media (min-width: 768px) {
      width: 500px;
    }
  }

  input::placeholder {
    color: hsl(0, 0%, 80%);
    font-size: 14px;
  }

  button {
    background-color: #20df7f;
    width: 300px;
    height: 45px;
    border-radius: 10px;
    font-size: 16px;
    color: #ffffff;
    border: none;
    box-shadow: 1px 2px 1px black;
    transition: all;
    transition-duration: 0.2s;

    :hover {
      background-color: #008000;
      cursor: pointer;
    }

    @media (min-width: 768px) {
      width: 500px;
    }
  }

  .p-container {
    margin-top: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .p-container > p {
    margin-bottom: 10px;
    color: white;
  }

  .login {
    color: #20df7f;
    transition: all;
    transition-duration: 0.2s;
    :hover {
      color: #008000;
      cursor: pointer;
    }
  }
  .link {
    text-decoration: none;
  }
`;
