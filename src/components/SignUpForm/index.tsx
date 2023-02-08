import Link from "next/link";
import React, { useState } from "react";
import * as C from "./styles";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebaseStorage.utils";
import { useDispatch } from "react-redux";
import { setUser, setUserInfo } from "../../store/userSlice/userSlicer";
import { useRouter } from "next/router";

const credInitialState = {
  name: "",
  email: "",
  password: "",
  numberId: "",
};

function SignUpForm() {
  const [credential, setCredential] = useState(credInitialState);
  const [signUpError, setSignUpError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name } = e.target;
    const { value } = e.target;
    setCredential({ ...credential, [name]: value });
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!credential.email || !credential.password || !credential.name) {
      setSignUpError("insira dados válidos");
      setCredential(credInitialState);
      return;
    }
    try {
      const userCredential = await createAuthUserWithEmailAndPassword(
        credential.email,
        credential.password
      );
      if (userCredential) {
        const { user } = userCredential;
        await createUserDocumentFromAuth(
          user,
          credential.name,
          "worker",
          credential.numberId
        );
        dispatch(setUser(user));
        dispatch(
          setUserInfo({
            name: credential.name,
            numberRegistration: credential.numberId,
            role: "admin",
          })
        );
        router.push("/admin");
      }
    } catch (error) {
      console.log(error);
    }
    setCredential(credInitialState);
  };
  return (
    <C.Container>
      <C.FormContainer>
        <form onSubmit={handleSubmit}>
          <legend>Cadastro</legend>
          <input
            placeholder="Nome"
            required
            type="text"
            name="name"
            value={credential.name}
            onChange={handleChange}
          />
          <input
            placeholder="Email"
            required
            type="email"
            value={credential.email}
            name="email"
            onChange={handleChange}
          />
          <input
            placeholder="Numero do cadastro"
            type="number"
            name="numberId"
            value={credential.numberId}
            onChange={handleChange}
          />
          <input
            placeholder="Senha"
            required
            type="password"
            name="password"
            value={credential.password}
            onChange={handleChange}
          />
          <button>Cadastrar</button>
        </form>
        <div className="p-container">
          <p>Já tem uma conta ?</p>
          <Link href="/" className="link">
            <p role={"button"} className="login">
              Fazer login
            </p>
          </Link>
        </div>
      </C.FormContainer>
      {/* <img className="img" src="Vectors.png" alt="" /> */}
    </C.Container>
  );
}

export default SignUpForm;
