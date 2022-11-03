
import { configureStore } from "@reduxjs/toolkit";

import mainReducer from "../reducers/mainReducer";
export default function configureStoreRoot(initialState = {}) {
  return configureStore({
    reducer: mainReducer,
    initialState: initialState,
    state:{}
  });
}
