import { useEffect, useState } from "react";

import { Paycheck } from "../../components/TableAdmin";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectUserInfo } from "../../store/userSlice/userSelector";
import {
  getMyPaycheckFile,
  getWorkerPaychecks,
  editFirestoreDoc,
} from "../../utils/firebaseStorage.utils";
import { useRouter } from "next/router";
import { logoutUser } from "../../store/userSlice/userSlicer";

const useEmployee = () => {
  const userInfo = useSelector(selectUserInfo);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [workerPaychecks, setWorkerPaychecks] = useState<Paycheck[]>([]);
  const [currentPaycheck, setCurrentPaycheck] = useState<Paycheck>();
  const [pdfUrl, setPdfUrl] = useState<string>("");

  useEffect(() => {
    const getPdfUrl = async () => {
      if (currentPaycheck) {
        const newPdfUrl = await getMyPaycheckFile(currentPaycheck.docRef);
        if (newPdfUrl) {
          setPdfUrl(newPdfUrl);
        }
      }
    };
    getPdfUrl();
    if (currentPaycheck && !currentPaycheck?.displayed) {
      editFirestoreDoc({ ...currentPaycheck, displayed: new Date() });
    }
  }, [currentPaycheck]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      if (userInfo) {
        const paychecksData = await getWorkerPaychecks(
          userInfo.numberRegistration
        );
        setWorkerPaychecks(paychecksData);
        setCurrentPaycheck(paychecksData[0]);
      }
      setIsLoading(false);
    };
    if (!user || !userInfo) {
      router.push("/");
    } else {
      getData();
    }
  }, [userInfo]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return [
    isLoading,
    workerPaychecks,
    pdfUrl,
    setCurrentPaycheck,
    currentPaycheck,
    handleLogout,
    userInfo,
  ] as const;
};

export default useEmployee;
