import React, { Dispatch, useState } from "react";
import { Paycheck } from "../TableAdmin";
import * as C from "./styles";

import {
  convertFirebaseDate,
  editFirestoreDoc,
} from "../../utils/firebaseStorage.utils";
import { MdDownloadForOffline } from "react-icons/md";

export type PaycheckCardProps = {
  paycheck: Paycheck;
  setCurrentPaycheck: Dispatch<React.SetStateAction<Paycheck | undefined>>;
  active: boolean;
  pdfUrl: string;
};

const PaycheckCard = ({
  pdfUrl,
  paycheck,
  setCurrentPaycheck,
  active,
}: PaycheckCardProps) => {
  const createdAt = convertFirebaseDate(paycheck.createdAt);
  const sendDayString = createdAt
    ? createdAt.getDate() +
      "/" +
      (createdAt.getMonth() + 1) +
      "/" +
      createdAt.getFullYear()
    : "";

  const handleDownload = async () => {
    await editFirestoreDoc({ ...paycheck, downloaded: new Date() });
  };

  return (
    <C.CardContainer
      active={active}
      onClick={() => setCurrentPaycheck(paycheck)}
    >
      <h1>{paycheck.projectName}</h1>
      <p>Competência: {paycheck.competence}</p>
      <p>Envio dia {sendDayString}</p>
      <a
        onClick={handleDownload}
        target="_blank"
        rel="noreferrer"
        href={pdfUrl}
        className="btnDownload"
      >
        <MdDownloadForOffline size={32} className="icon" />
      </a>
    </C.CardContainer>
  );
};

export default PaycheckCard;
