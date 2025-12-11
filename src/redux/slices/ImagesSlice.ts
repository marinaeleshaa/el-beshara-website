import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";
import { images } from "@/data/images";

interface IState {
    images: string[]
}



const initialState: IState = {
    images: images
};

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    toggleLang(state) {
      const newLang = state.lang === "ar" ? "en" : "ar";
      state.lang = newLang;
      
      // Set cookie - next-intl expects NEXT_LOCALE
      document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;
      document.cookie = `locale=${newLang}; path=/; max-age=31536000`;
      
      // Reload to apply new locale
      window.location.reload();
    },
    setLang(state, action: { payload: "ar" | "en" }) {
      state.lang = action.payload;
      document.cookie = `NEXT_LOCALE=${action.payload}; path=/; max-age=31536000`;
      document.cookie = `locale=${action.payload}; path=/; max-age=31536000`;
    }
  },
});

export const { toggleLang, setLang } = langSlice.actions;
export const langSelector = (state: RootState) => state.lang;
export default langSlice.reducer;