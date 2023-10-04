import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  safeSequence: [],
  activities: [],
  show: false,
  errorMessage: null,
  needs: [],
  requests: [],
  available: [],
};

const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    updateResult: {
      prepare(status, activities, errorMessage = null) {
        return {
          payload: { status, activities, errorMessage },
        };
      },
      reducer(state, action) {
        state.status = action.payload.status;
        state.activities = action.payload.activities;
        state.safeSequence =
          action.payload.status === "safe" ||
          action.payload.status === "no deadlock"
            ? action.payload.activities.map((act) => act.selectedProcess)
            : [];
        state.errorMessage = action.payload.errorMessage;
      },
    },
    showResult(state) {
      state.show = true;
    },
    hideResult(state) {
      state.show = false;
    },
    updateNeeds(state, action) {
      state.needs = action.payload;
    },
    updateRequests(state, action) {
      state.requests = action.payload;
    },
    updateAvailable(state, action) {
      state.available = action.payload;
    },
  },
});

export const {
  updateResult,
  showResult,
  hideResult,
  updateNeeds,
  updateRequests,
  updateAvailable,
} = resultSlice.actions;

export default resultSlice.reducer;
