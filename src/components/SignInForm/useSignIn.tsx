import React, { useState, useEffect } from "react";
import {
  getUserInfo,
  signInAuthWithEmailAndPassword,
} from "../../utils/firebaseStorage.utils";
import { AuthError } from "firebase/auth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserInfo } from "../../store/userSlice/userSlicer";
import { selectUserInfo } from "../../store/userSlice/userSelector";

const useSignIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useSelector(selectUserInfo);
  const [logInError, setlogInError] = useState("");
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    switch (userInfo?.role) {
      case "worker":
        router.push("/employee");
        break;
      case "admin":
        router.push("/admin");
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name } = e.target;
    const { value } = e.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  }

  const Signin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!userCredentials.email || !userCredentials.password) {
      setlogInError("insira dados válidos");
      setUserCredentials({
        email: "",
        password: "",
      });
      return;
    }

    try {
      const userCredential = await signInAuthWithEmailAndPassword(
        userCredentials.email,
        userCredentials.password
      );
      if (userCredential) {
        const { user } = userCredential;
        const userInfo = await getUserInfo(user.uid);
        if (userInfo) {
          dispatch(
            setUserInfo({
              name: userInfo.name,
              numberRegistration: userInfo.numberRegistration,
              role: userInfo.role,
            })
          );
          switch (userInfo.role) {
            case "admin":
              router.push("/admin");
              break;
            case "worker":
              router.push("employee");
          }
        }
        dispatch(setUser(user));
      }
    } catch (error) {
      const newError = error as AuthError;
      switch (newError.code) {
        case "auth/wrong-password":
          setlogInError("Senha ou email incorretos");
          break;
        case "auth/too-many-requests":
          setlogInError(
            "muitas tentativas erradas, tente novamente mais tarde"
          );
          break;
        case "auth/user-not-found":
          setlogInError("Usuário não encontrado.");
          break;
        default:
          setlogInError(
            "Ocorreu um erro não esperado, tente novamente mais tarde"
          );
      }
      setIsLoading(false);
    }
    setUserCredentials({
      email: "",
      password: "",
    });
  };

  return [
    Signin,
    userCredentials,
    handleChange,
    logInError,
    isLoading,
  ] as const;
};

export default useSignIn;
