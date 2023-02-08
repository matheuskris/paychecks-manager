import Link from "next/link";
import React from "react";
import * as C from "./styles";
import Loading from "../Loading/Loading";
import useSignIn from "./useSignIn";

function SignInForm() {
  const [Signin, userCredentials, handleChange, logInError, isLoading] =
    useSignIn();

  return (
    <C.Container>
      <C.FormContainer>
        <form onSubmit={Signin}>
          <legend>Login</legend>

          <input
            placeholder="Email"
            required
            type="email"
            value={userCredentials.email}
            name="email"
            onChange={handleChange}
          />

          <input
            placeholder="Senha"
            required
            type="password"
            name="password"
            value={userCredentials.password}
            onChange={handleChange}
          />

          {logInError ? <p className="erro">{logInError}</p> : ""}

          <button>
            {" "}
            {isLoading ? <Loading func={false} RH={false} /> : "Login"}
          </button>
        </form>

        <div className="p-container">
          <p>Não tem uma conta ?</p>
          <Link href="/signUp" className="link">
            <p role={"button"} className="login">
              Cadastrar
            </p>
          </Link>
        </div>
      </C.FormContainer>
      <img className="img" src="Vectors.png" alt="" />
    </C.Container>
  );
}

export default SignInForm;
