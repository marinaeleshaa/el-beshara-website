import { configureStore } from "@reduxjs/toolkit";
import langReducer from "./LangSlice";
import adminsSlice from "./AdminsSlice";
import PromotionSlice from "./PromotionsSlice";
import ImgSlice from "./ImagesSlice";
import ReelsSlice from "./ReelsSlice";
import ProfileSlice from "./ProfileSlice";

import VideoSlice from "./VideoSlice";
export const store = configureStore({
  reducer: {
    lang: langReducer,
    admins: adminsSlice,
    promotions: PromotionSlice,
    img: ImgSlice,
    video: VideoSlice,
    reels: ReelsSlice,
    profile: ProfileSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
