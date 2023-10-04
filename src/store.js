import resultReducer from "./resultSlice";
import problemReducer from "./problemSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    result: resultReducer,
    problem: problemReducer,
  },
});

export default store;
