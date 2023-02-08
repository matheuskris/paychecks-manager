import styled from "styled-components";

interface sidebarProps {
  sidebar: boolean;
}

export const SidebarContainer = styled.div<sidebarProps>`
  background-color: #171923;
  opacity: 0.99;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 390px;
  right: ${(props) => (props.sidebar ? "0" : "-100%")};
  animation: showSidebar 0.15s ease-in;
  padding: 24px 24px;

  @keyframes showSidebar {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 390px;
    }
  }

  svg.XButton {
    cursor: pointer;
    width: 32px;
    height: 32px;
    margin-bottom: 10%;
    color: white;
  }

  h2 {
    color: white;
    margin-bottom: 2%;
    font-size: 2rem;
  }

  div.divItens {
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 15px;
    height: 45px;
    margin-top: 30px;
  }

  label {
    padding: 5px 5px;
    color: black;
    background-color: white;
    cursor: pointer;
    width: 60%;
  }

  > input {
    display: none;
  }

  select {
    display: block;
    margin: 5% 0;
    height: 30px;
    font-size: 1.1rem;
    width: 60%;
    cursor: pointer;
  }

  button {
    width: 60%;
    height: 30px;
    border-radius: 5px;
    display: block;
    padding-inline: 0.5%;
    margin: 10% 0;
    font-size: 1.1rem;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  button.upload {
    background-color: green;
    color: white;
    border: none;

    :hover {
      background-color: darkgreen;
    }
  }

  button[disabled] {
    background-color: gray;
    cursor: not-allowed;

    :hover {
      background-color: gray;
    }
  }

  /* ===== new project name stuff =====  */

  div.divNewProject {
    height: 45px;
    margin-top: 30px;
  }

  div.divLabelInput {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 7%;
  }

  label.newProjectName {
    background-color: transparent;
    color: white;
    flex: 0;
  }

  input.createProject {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid white;
    border-radius: 4px;
    outline: none;
    color: white;
    height: 100%;
    font-size: 1rem;
    flex: 1;
  }

  button.newProjectName {
    width: 100%;
    margin: 5% 0;
  }
`;
