import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";

interface IState {
  lang: "ar" | "en";
}

// Get initial lang from cookie or default
const getInitialLang = () => {
  if (typeof window !== "undefined") {
    // Read from next-intl's cookie if available
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const localeCookie = cookies.find(cookie => cookie.startsWith('NEXT_LOCALE='));
    
    if (localeCookie) {
      const value = localeCookie.split('=')[1];
      return value === "ar" ? "ar" : "en";
    }
    
    // Fallback to checking for our cookie
    const match = document.cookie.match(/locale=([^;]+)/);
    if (match) {
      const value = match[1];
      return value === "ar" ? "ar" : "en";
    }
  }
  return "en";
};

const initialState: IState = {
  lang: getInitialLang() as "ar" | "en",
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