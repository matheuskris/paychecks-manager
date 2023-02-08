import { combineReducers, configureStore, AsyncThunk } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import userReducer from "./userSlice/userSlicer";
import holeritsReducer from "./holeritsSlice/holeritsSlicer";
import projectsListSlicer from "./projectsSlice/projectsListSlicer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userStatePH"],
};

const rootReducer = combineReducers({
  userStatePH: userReducer,
  holeritsStatePH: holeritsReducer,
  projectsListPH: projectsListSlicer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
