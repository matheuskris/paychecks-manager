import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { HiMenu } from "react-icons/hi";
import * as C from "./styles";
import Image from "next/image";

export type Project = {
  id: string;
  projectName: string;
};

export type ProjectsArray = Project[];

export type HeaderProps = {
  projects: ProjectsArray;
  rh: boolean;
  setFilteredStartDate: React.Dispatch<React.SetStateAction<string>>;
  filteredStartDate: string;
  setFilteredFinishDate: React.Dispatch<React.SetStateAction<string>>;
  filteredFinishDate: string;
  filterPaychecks: () => void;
};

const HeaderHolerite = ({
  projects,
  rh,
  setFilteredStartDate,
  filteredStartDate,
  setFilteredFinishDate,
  filteredFinishDate,
  filterPaychecks,
}: HeaderProps) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredStartDate(e.target.value);
  };

  const handleFinishDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredFinishDate(e.target.value);
  };

  return (
    <C.Container>
      <C.HeaderContainer>
        <div className="logo-cont">
          <Image src={"/employeee.png"} width={200} height={200} alt="logo" />
        </div>
        <div className="divFilterMenuIcon">
          <p>Filtrar por período :</p>
          <input
            onChange={handleStartDate}
            value={filteredStartDate}
            type="date"
          />
          <p>Até</p>
          <input
            onChange={handleFinishDate}
            value={filteredFinishDate}
            type="date"
          />
          <button onClick={filterPaychecks}>Buscar</button>
          {rh && <HiMenu className="menuBtn" onClick={showSidebar} />}
        </div>
        {sidebar && (
          <Sidebar
            sidebar={sidebar}
            setSidebar={setSidebar}
            projects={projects}
            filterPaychecks={filterPaychecks}
          />
        )}
      </C.HeaderContainer>
    </C.Container>
  );
};

export default HeaderHolerite;
