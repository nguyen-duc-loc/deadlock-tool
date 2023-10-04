import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  problemType: "banker",
  processNum: 4,
  resourceNum: 3,
  processInforType: "max",
  resourceInforType: "total",
  request: false,
  requestProcess: 0,
};

const problemSlice = createSlice({
  name: "problem",
  initialState,
  reducers: {
    updateProblemType(state, action) {
      state.problemType = action.payload;
      if (action.payload === "banker") {
        state.processInforType = "max";
      } else {
        state.processInforType = "request";
      }
    },
    updateProcessNum(state, action) {
      state.processNum = action.payload;
    },
    increaseProcessNum(state) {
      state.processNum++;
    },
    decreaseProcessNum(state) {
      state.processNum--;
    },
    updateResourceNum(state, action) {
      state.resourceNum = action.payload;
    },
    updateProcessInforType(state, action) {
      state.processInforType = action.payload;
    },
    updateResourceInforType(state, action) {
      state.resourceInforType = action.payload;
    },
    updateRequest(state, action) {
      state.request = action.payload;
    },
    updateRequestProcess(state, action) {
      state.requestProcess = action.payload;
    },
  },
});

export const {
  updateProblemType,
  updateProcessInforType,
  updateResourceInforType,
  updateResourceNum,
  increaseProcessNum,
  decreaseProcessNum,
  updateRequest,
  updateRequestProcess,
  updateProcessNum,
} = problemSlice.actions;

export default problemSlice.reducer;
