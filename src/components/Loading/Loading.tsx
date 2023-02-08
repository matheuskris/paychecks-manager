import * as C from "./styles";
import React from "react";

interface LoadingProps {
  RH: boolean;
  func: boolean;
}

const Loading = ({ RH, func }: LoadingProps) => {
  return (
    <C.LoadingContainer func={func} RH={RH}>
      <img
        src={
          RH ? "/loading.gif" : func ? "/pontosCarregando.gif" : "/loading.gif"
        }
        alt="Loading"
      />
    </C.LoadingContainer>
  );
};

export default Loading;
