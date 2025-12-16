import { configureStore } from "@reduxjs/toolkit";
import langReducer from "./LangSlice";
import adminsSlice from "./AdminsSlice";
import PromotionSlice from "./PromotionsSlice";
import ImgSlice from "./ImagesSlice";
import ReelsSlice from "./ReelsSlice";

import VideoSlice from "./VideoSlice";
export const store = configureStore({
  reducer: {
    lang: langReducer,
    admins: adminsSlice,
    promotions: PromotionSlice,
    img: ImgSlice,
    video: VideoSlice,
    reels:ReelsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
