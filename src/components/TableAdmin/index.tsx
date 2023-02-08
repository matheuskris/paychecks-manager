import React from "react";
import * as C from "./styles";

export type Paycheck = {
  type: string;
  projectId: string;
  projectName: string;
  client: string;
  workerId: string;
  workerName: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
  competence: string;
  expiration?: Date;
  displayed?: Date;
  downloaded?: Date;
  docRef: string;
  originalName: string;
};

type TableProps = {
  paychecks: Paycheck[];
};

const TableAdmin = ({ paychecks }: TableProps) => {
  return (
    <C.Table>
      <thead>
        <tr>
          <th>Número</th>
          <th>Projeto</th>
          <th>Cliente</th>
          <th>Autor</th>
          <th>Tipo</th>
          <th>Usuário do Cliente</th>
          <th>Visualizado</th>
          <th>Baixado</th>
          {/* <th>Envio</th>
          <th>Vencimento</th>
          <th>Competência</th> */}
        </tr>
      </thead>
      <tbody>
        {paychecks &&
          paychecks.map((register: Paycheck, index) => (
            <tr key={index}>
              <td>{register.workerId}</td>
              <td>{register.projectName}</td>
              <td>{register.client}</td>
              <td>{register.authorName}</td>
              <td>{register.type}</td>
              <td>{register.workerName}</td>
              <td>{register.displayed ? "sim" : "não"}</td>
              <td>{register.downloaded ? "sim" : "não"}</td>
              {/* <td>{register.envio}</td>
            <td>{register.vencimento}</td>
            <td>{register.competencia}</td> */}
            </tr>
          ))}
      </tbody>
    </C.Table>
  );
};

export default TableAdmin;
