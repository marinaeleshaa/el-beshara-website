import { createSlice } from "@reduxjs/toolkit";
interface DashboardViewState {
    view: "grid" | "list";
}

const initialState: DashboardViewState = {
  view: "grid",
};

const DashboardViewSlice = createSlice({
  name: "dashView",
  initialState,
  reducers: {
   toggleView(state) {
    state.view = state.view === "grid" ? "list" : "grid";
   }
  },
});

export const { toggleView } = DashboardViewSlice.actions;
export default DashboardViewSlice.reducer;
