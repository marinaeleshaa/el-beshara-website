import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";
import { IPromotionInterface } from "@/lib/Interfaces/PromotionInterface";
import { addPromotionMethod, getPromotionsMethod } from "@/lib/api/promotions";
import { IMeta } from "@/lib/Interfaces/metaInterface";

interface IState {
  promotions: IPromotionInterface[];
  isLoading: boolean;
  meta: IMeta;
}

const initialState: IState = {
  promotions: [],
  isLoading: false,
  meta: {
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 1,
  },
};

export const addPromotionAction = createAsyncThunk(
  "promotions/addPromotion",
  async (data: IPromotionInterface, thunkAPI) => {
    try {
      const res = await addPromotionMethod(data);
      console.log(res)
      if (res.status !== "success") {
        return thunkAPI.rejectWithValue(res.message);
      }
      return res
    } catch (err) {
      if (err instanceof Error) return thunkAPI.rejectWithValue(err.message);
      return thunkAPI.rejectWithValue(
        "An error occurred. Please try again later."
      );
    }
  }
);

export const getPromotionsAction = createAsyncThunk(
  "promotions/getPromotions",
  async ({ page = 1, limit = 5 }: { page?: number; limit?: number }, thunkAPI) => {
    try {
      const res = await getPromotionsMethod({ page, limit });
      if (res.status !== "success") {
        return thunkAPI.rejectWithValue(res.message);
      }
      return res
    } catch (err) {
      if (err instanceof Error) return thunkAPI.rejectWithValue(err.message);
      return thunkAPI.rejectWithValue(
        "An error occurred. Please try again later."
      );
    }
  }
);

const PromotionsSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // todo => add promotion
    builder.addCase(addPromotionAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addPromotionAction.fulfilled, (state, action) => {
      state.promotions.push(action.payload.data);
      state.isLoading = false;
    });
    builder.addCase(addPromotionAction.rejected, (state) => {
      state.isLoading = false;
    });

    // todo => get all promotions
    builder.addCase(getPromotionsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPromotionsAction.fulfilled, (state, action) => {
      state.promotions = action.payload.data;
      state.meta = action.payload.meta;
      state.isLoading = false;
    });
    builder.addCase(getPromotionsAction.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {} = PromotionsSlice.actions;
export const promotionsSelector = (state: RootState) => state.promotions;
export default PromotionsSlice.reducer;
