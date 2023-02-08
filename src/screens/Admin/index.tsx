import React from "react";
import Table from "../../components/TableAdmin";
import HeaderHolerite from "../../components/Header";
import * as A from "./styles";
import Loading from "../../components/Loading/Loading";
import useAdminScreen from "./useAdminScreen";

function AdminScreen() {
  const [
    filterPaychecks,
    setFilteredFinishdDate,
    filteredFinishDate,
    filteredStartDate,
    setFiltereStartdDate,
    projectsList,
    isLoading,
    paychecks,
  ] = useAdminScreen();

  return (
    <A.AdminContainer>
      <HeaderHolerite
        filterPaychecks={filterPaychecks}
        setFilteredFinishDate={setFilteredFinishdDate}
        filteredFinishDate={filteredFinishDate}
        filteredStartDate={filteredStartDate}
        setFilteredStartDate={setFiltereStartdDate}
        projects={projectsList}
        rh={true}
      />
      <A.TableContainer>
        {isLoading ? (
          <Loading func={false} RH={true} />
        ) : (
          <Table paychecks={paychecks} />
        )}
      </A.TableContainer>
    </A.AdminContainer>
  );
}

export default AdminScreen;
