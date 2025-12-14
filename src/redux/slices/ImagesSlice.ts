import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";
import { IImage } from "@/lib/Interfaces/ImgInterface";
import { AddImageMethod } from "@/lib/api/img";

interface IState {
  images: IImage[];
  isLoading: boolean;
}

const initialState: IState = {
  images: [],
  isLoading: false,
};

export const AddImageAction = createAsyncThunk(
  "img/addImage",
  async (data: IImage, thunkAPI) => {
    try {
      const res = await AddImageMethod(data);
      if (res.status !== "success") {
        return thunkAPI.rejectWithValue(res.message);
      }
      return res;
    } catch (err) {
      if (err instanceof Error) return thunkAPI.rejectWithValue(err.message);
      return thunkAPI.rejectWithValue(
        "An error occurred. Please try again later."
      );
    }
  }
);

const ImgSlice = createSlice({
  name: "img",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AddImageAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AddImageAction.fulfilled, (state, action) => {
      state.images.push(action.payload.data);
      state.isLoading = false;
    });
    builder.addCase(AddImageAction.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {} = ImgSlice.actions;
export const langSelector = (state: RootState) => state.lang;
export default ImgSlice.reducer;
