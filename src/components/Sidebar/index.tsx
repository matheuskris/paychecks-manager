import React from "react";
import * as C from "./styles";
import { Project } from "../Header";
import { CgCloseR } from "react-icons/cg";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiOutlineFileSearch } from "react-icons/ai";
import { AiOutlineProject } from "react-icons/ai";
import { RiUploadCloudFill } from "react-icons/ri";
import useSidebar from "./useSideBar";

interface SidebarProps {
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  sidebar: boolean;
  projects: Project[];
  filterPaychecks: () => void;
}

export type PaycheckInfo = {
  type: string;
  projectName: string;
  projectId: string;
  client: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
  valueInCents?: string;
};

const Sidebar = ({
  setSidebar,
  sidebar,
  projects,
  filterPaychecks,
}: SidebarProps) => {
  const [
    handleChangeSelect,
    files,
    handleOnChange,
    projectId,
    projInput,
    setProjInput,
    handleTextChange,
    newprojName,
    handleNewProject,
    isBtnDisable,
    uploadFiles,
  ] = useSidebar(projects, filterPaychecks);

  return (
    <C.SidebarContainer sidebar={sidebar}>
      <CgCloseR className="XButton" onClick={() => setSidebar(false)} />
      <h2>Importar holerites</h2>
      <div className="divItens">
        <AiOutlineProject size={30} color="white" />
        <select onChange={handleChangeSelect} name="project">
          <option value="">Escolha um projeto:</option>
          {projects.map((project, index) => (
            <option key={index} value={project.id}>
              {project.projectName}
            </option>
          ))}
        </select>
      </div>
      <div className="divItens">
        <AiOutlineFileSearch size={30} color="white" />
        <label htmlFor="file">
          {files && files.length > 0
            ? `${files?.length} selecionados`
            : " Selecionar arquivos"}
        </label>
      </div>
      <input
        onChange={handleOnChange}
        type="file"
        multiple
        name="arquivos[]"
        id="file"
      />{" "}
      {!projectId && projInput === false && (
        <div className="divItens">
          <AiFillPlusCircle size={30} color="white" />
          <button onClick={() => setProjInput(true)} className="createProject">
            Criar um projeto
          </button>
        </div>
      )}
      {projInput === true && (
        <div className="divNewProject">
          <div className="divLabelInput">
            <label className="newProjectName" htmlFor="newProjectName">
              Nome:
            </label>
            <input
              id="newProjectName"
              className="createProject"
              onChange={handleTextChange}
              value={newprojName}
              type="text"
            />
          </div>
          <button onClick={() => handleNewProject()} className="newProjectName">
            Criar Novo Projeto
          </button>
        </div>
      )}
      {projectId && (
        <div className="divItens">
          <RiUploadCloudFill
            color={isBtnDisable ? "gray" : "green"}
            size={30}
          />
          <button
            disabled={isBtnDisable}
            className="upload"
            onClick={uploadFiles}
          >
            Upload
          </button>
        </div>
      )}
    </C.SidebarContainer>
  );
};

export default Sidebar;
