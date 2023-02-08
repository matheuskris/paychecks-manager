import React from "react";
import * as C from "./styles";
import Loading from "../../components/Loading/Loading";
import Image from "next/image";

import PaycheckCard from "../../components/paycheckCard";
import useEmployee from "./useEmployee";

const Employee = () => {
  const [
    isLoading,
    workerPaychecks,
    pdfUrl,
    setCurrentPaycheck,
    currentPaycheck,
  ] = useEmployee();

  return (
    <C.EmployeeContainer>
      <C.HContainer>
        <div className="logo-cont">
          <Image src={"/employeee.png"} width={200} height={200} alt="logo" />
        </div>
      </C.HContainer>
      <C.BodyContainer>
        <C.CardsContainer>
          <h1>Seus contracheques disponíveis:</h1>
          {isLoading && <Loading func={true} RH={false} />}
          {!isLoading &&
            workerPaychecks.map((PayC) => {
              return (
                <PaycheckCard
                  key={PayC.docRef}
                  pdfUrl={pdfUrl}
                  paycheck={PayC}
                  setCurrentPaycheck={setCurrentPaycheck}
                  active={currentPaycheck?.docRef === PayC.docRef}
                />
              );
            })}
        </C.CardsContainer>
        <C.PdfContainer>
          {!isLoading && (
            <embed
              type="application/pdf"
              src={`${pdfUrl}#toolbar=0`}
              width="full"
              height={800}
            />
          )}
        </C.PdfContainer>

        <Image
          width={1490}
          height={90}
          className="img"
          src="/Vectors.png"
          alt=""
        />
      </C.BodyContainer>
    </C.EmployeeContainer>
  );
};

export default Employee;
