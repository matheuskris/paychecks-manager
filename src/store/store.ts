import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";

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
    }).concat(logger),
});

export const persistor = persistStore(store);
