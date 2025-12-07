import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";

interface IState {
  lang: "ar" | "en";
}

const initialState: IState = {
  lang: "en",
};
const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    toggleLang(state) {
      state.lang = state.lang === "ar" ? "en" : "ar";
    },
  },
});

export const { toggleLang } = langSlice.actions;
export const langSelector = (state: RootState) => state.lang;
export default langSlice.reducer;