import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";
import { IProfile } from "@/lib/Interfaces/AboutInterface";
import { getAbout } from "@/lib/api/about";

interface IState {
  profile: IProfile;
  isLoading: boolean;
}

const initialState: IState = {
  isLoading: false,
  profile: {
    logo: {
      public_id: "",
      url: "",
    },
    socialMedia: [],
    email: "",
    phoneNumbers: [],
    address: {
      building: 0,
      street: "",
      city: "",
    },
  },
};

export const getProfileDataAction = createAsyncThunk("profile/getProfile", async () => {
  const res = await getAbout();
  return res;
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfileDataAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProfileDataAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getProfileDataAction.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {} = profileSlice.actions;
export const profileSelector = (state: RootState) => state.profile;
export default profileSlice.reducer;
