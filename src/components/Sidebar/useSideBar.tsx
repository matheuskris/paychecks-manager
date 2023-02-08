import React, { useState } from "react";
import {
  uploadFilesToFirebaseStorage,
  createNewProject,
} from "../../utils/firebaseStorage.utils";
import { Project } from "../Header";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchProjectsList } from "../../store/projectsSlice/projectsListSlicer";

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

const useSidebar = (projects: Project[], filterPaychecks: () => void) => {
  const [projectId, setProjectId] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>();
  const [projInput, setProjInput] = useState(false);
  const [newprojName, setNewProjName] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const uploadFiles = async () => {
    if (!files || !projectId) return;
    const filesProject = projects.filter(
      (project) => project.id === projectId
    )[0];

    const paycheckInfo: PaycheckInfo = {
      type: "Holerite",
      projectName: filesProject?.projectName,
      projectId: filesProject?.id,
      client: "Associação Humana Povo Para Povo Brasil - Matriz",
      authorId: "PdSidsaj9318DSAf13H",
      authorName: "Fernanda Mascarenhas",
      createdAt: new Date(),
    };

    await uploadFilesToFirebaseStorage(projectId, files, paycheckInfo);
    setFiles(null);
    filterPaychecks();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProjectId(e.target.value);
    setProjInput(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewProjName(value);
  };

  const handleNewProject = async () => {
    await createNewProject(newprojName);
    dispatch(fetchProjectsList());
    setProjInput(false);
  };

  const isBtnDisable = files && files.length > 0 ? false : true;

  return [
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
  ] as const;
};

export default useSidebar;
