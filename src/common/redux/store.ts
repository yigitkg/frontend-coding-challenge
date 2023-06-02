import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/searchReducer";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
