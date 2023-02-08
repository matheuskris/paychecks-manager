import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  addDoc,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  FullMetadata,
  StorageReference,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";

import { Paycheck } from "../components/TableAdmin";
import { ProjectsArray } from "../components/Header";
import { PaycheckInfo } from "../components/Sidebar";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  measurementId: process.env.NEXT_PUBLIC_measurementId,
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const storage = getStorage();
const firestoreDB = getFirestore();
const storageRef = ref(storage);

type UploadDataResponse = {
  ref: StorageReference;
  data: FullMetadata;
  originalName: string;
  competence: string;
  valueInCents: string;
  workerId: string;
  workerName: string;
};

const getKeyFromDocName = (docName: string): string => {
  const dotIndex = docName.indexOf(".");
  const simpleName = docName.slice(0, dotIndex);

  return (Math.random() * 100000000000000).toFixed() + simpleName;
};

const addStorageRefToFirestore = async (
  projectId: string,
  uploadDataArray: UploadDataResponse[],
  paycheckInfo: PaycheckInfo
) => {
  const projectRef = collection(firestoreDB, "projects");
  const workersRef = collection(firestoreDB, "workers");
  const periodsRef = collection(firestoreDB, "periods");

  const batch = writeBatch(firestoreDB);

  uploadDataArray.forEach((object) => {
    const paycheckData: Paycheck = {
      docRef: object.ref.fullPath,
      competence: object.competence,
      workerId: object.workerId,
      workerName: object.workerName,
      originalName: object.originalName,
      ...paycheckInfo,
    };

    const projectIdRef = doc(projectRef, projectId);
    const paycheckRef = collection(projectIdRef, "paychecks");
    const paycheckIdRef = doc(
      paycheckRef,
      paycheckData.docRef.replace("Holerites/", "")
    );
    batch.set(paycheckIdRef, paycheckData);

    const periodRef = doc(periodsRef, object.competence.replace("/", ""));
    batch.set(
      periodRef,
      {
        [paycheckData.docRef.replace("Holerites/", "")]: paycheckData,
      },
      { merge: true }
    );

    const workerIdRef = doc(workersRef, object.workerId);
    batch.set(
      workerIdRef,
      { workerId: object.workerId, name: object.workerName },
      { merge: true }
    );
    const workerPaycheksRef = collection(workerIdRef, "Paychecks");
    const workerPaycheckRef = doc(
      workerPaycheksRef,
      paycheckData.docRef.replace("Holerites/", "")
    );
    batch.set(workerPaycheckRef, paycheckData, { merge: true });
  });

  await batch.commit();
  console.log("done");
};

export const editFirestoreDoc = async (newPayCData: Paycheck) => {
  const projectRef = collection(firestoreDB, "projects");
  const workersRef = collection(firestoreDB, "workers");
  const periodsRef = collection(firestoreDB, "periods");

  const batch = writeBatch(firestoreDB);

  const projectIdRef = doc(projectRef, newPayCData.projectId);
  const paycheckRef = collection(projectIdRef, "paychecks");
  const paycheckIdRef = doc(
    paycheckRef,
    newPayCData.docRef.replace("Holerites/", "")
  );
  batch.set(paycheckIdRef, newPayCData);

  const periodRef = doc(periodsRef, newPayCData.competence.replace("/", ""));
  batch.set(
    periodRef,
    {
      [newPayCData.docRef.replace("Holerites/", "")]: newPayCData,
    },
    { merge: true }
  );

  const workerIdRef = doc(workersRef, newPayCData.workerId);
  batch.set(
    workerIdRef,
    { workerId: newPayCData.workerId, name: newPayCData.workerName },
    { merge: true }
  );
  const workerPaycheksRef = collection(workerIdRef, "Paychecks");
  const workerPaycheckRef = doc(
    workerPaycheksRef,
    newPayCData.docRef.replace("Holerites/", "")
  );
  batch.set(workerPaycheckRef, newPayCData, { merge: true });

  await batch.commit();
  console.log("done");
};

export const uploadFilesToFirebaseStorage = async (
  projectId: string,
  files: FileList,
  paycheckInfo: PaycheckInfo
) => {
  const response = [];

  if (!files) return "no files to upload";

  const dataFromPdfFiles = await getPdfData(files);

  if (!dataFromPdfFiles) return;

  for (let i = 0; i < files.length; i++) {
    const newName = getKeyFromDocName(files[i].name);

    const filePdfData = dataFromPdfFiles[i];

    const documentRef = ref(storage, "Holerites/" + newName);

    const uploadData = await uploadBytes(documentRef, files[i])
      .then((snapshot) => {
        console.log("uploaded file");

        return { ref: snapshot.ref, data: snapshot.metadata };
      })
      .catch((err) => console.log(err));

    if (!uploadData) {
      return "não foi possível completar o envio";
    }
    response.push({ ...uploadData, ...filePdfData });
  }

  const docToSend = response.map((object, i) => ({
    ...object,
    originalName: files[i].name,
  }));

  addStorageRefToFirestore(projectId, docToSend, paycheckInfo);

  return response;
};

export const getMyPaycheckFile = async (docRef: string) => {
  const fileRef = ref(storage, docRef);
  return await getDownloadURL(fileRef).catch((err) => console.log(err));
};

export const getPaychecks = async (period: string): Promise<Paycheck[]> => {
  const periodsRef = collection(firestoreDB, "periods");
  const periodDocRef = doc(periodsRef, period);

  const data = await getDoc(periodDocRef)
    .then((snapshot) => {
      return snapshot.data();
    })
    .catch((err) => console.log(err));

  const dataArray = [];

  for (const prop in data) {
    dataArray.push({ ...data[prop], key: prop });
  }

  return dataArray;
};

export const getWorkerPaychecks = async (workerId: string) => {
  const workersRef = collection(firestoreDB, "workers");
  const workerDocRef = doc(workersRef, workerId);
  const paychecksRefCollection = collection(workerDocRef, "Paychecks");
  const q = query(paychecksRefCollection);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Paycheck
  );
};

export const createNewProject = async (projectName: string) => {
  const projListColRef = collection(firestoreDB, "projectsList");

  const res = await addDoc(projListColRef, {
    projectName,
  }).catch((err) => {
    console.log(err);
  });

  console.log("done");
};

type ProjectData = {
  projectName: string;
};

export const getProjectsList = async (): Promise<ProjectsArray> => {
  const projectsListRef = collection(firestoreDB, "projectsList");
  const q = query(projectsListRef);

  const querySnapshot = await getDocs(q);
  const newProjects = querySnapshot.docs.map((docSnapshot) => {
    return { ...(docSnapshot.data() as ProjectData), id: docSnapshot.id };
  });
  return newProjects;
};

export type PdfData = {
  competence: "string";
  valueInCents: "string";
  workerId: "string";
  workerName: "string";
};

export const getPdfData = async (files: FileList) => {
  if (!files) return;
  const formData = new FormData();
  Array.from(files).map((file) => {
    formData.append("theFiles", file, file.name);
  });

  const axiosConfig = {
    headers: { "content-type": "multipart/form-data" },
    onUploadProgress: (event: any) => {
      console.log(
        "Current progress:",
        Math.round((event.loaded * 100) / event.total)
      );
    },
  };

  const response = await axios.post("/api/pdfjs", formData, axiosConfig);

  console.log(response.data);

  return response.data.pdfData as PdfData[];
};
// ====== User Authentication ===== //

const auth = getAuth();

export type UserData = User & {
  id: string;
  createdAt: Date;
  displayName: string;
  email: string;
  name: string;
  role: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  name: string,
  role: string,
  numberRegistration: string
): Promise<void | UserData> => {
  if (!userAuth) return;
  const userDocRef = doc(firestoreDB, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  // pega as informações do google e joga no firebase:
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        name,
        role,
        numberRegistration,
      });
    } catch (error) {
      console.log("error creating the user", error);
    }
  }
  return { id: userSnapshot.id, ...userSnapshot.data() } as UserData;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export type userInfo = {
  displayName: string;
  email: string;
  createdAt: string;
  name: string;
  role: string;
  numberRegistration: string;
};

export const getUserInfo = async (userUid: string) => {
  const collectionRef = collection(firestoreDB, "users");
  const userRef = doc(collectionRef, userUid);

  const data = await getDoc(userRef)
    .then((snapshot) => {
      return snapshot.data() as userInfo;
    })
    .catch((err) => console.log(err));

  return data;
};

export const convertFirebaseDate = (firebaseDate: any) => {
  return (firebaseDate as Timestamp).toDate();
};
