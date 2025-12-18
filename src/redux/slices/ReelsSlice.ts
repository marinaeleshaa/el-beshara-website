import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";
import { IImage, IMediaItem } from "@/lib/Interfaces/ImgInterface";
import { AddReelMethod, getReelsMethod } from "@/lib/api/reels";
import { deleteVideoMethod } from "@/lib/api/video";
import { clear } from "console";

interface IState {
  reels: IMediaItem[];
  isLoading: boolean;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  selectedReels: string[];
}

const initialState: IState = {
  reels: [],
  isLoading: false,
  meta: {
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 1,
  },
  selectedReels: [],
};

export const AddReelsAction = createAsyncThunk(
  "img/addImage",
  async (data: IImage, thunkAPI) => {
    try {
      const res = await AddReelMethod(data);
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

export const getReelsAction = createAsyncThunk(
  "img/getImages",
  async (
    {
      page = 1,
      limit = 5,
      isReel = true,
    }: { page?: number; limit?: number; isReel?: boolean },
    thunkAPI
  ) => {
    try {
      const res = await getReelsMethod({ page, limit, isReel });
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

export const deleteReelsAction = createAsyncThunk(
  "img/deleteImages",
  async (ids: string[]) => {
    await deleteVideoMethod(ids);
    return ids;
  }
);

export const deleteOneReelAction = createAsyncThunk(
  "img/deleteOneImage",
  async (id: string) => {
    await deleteVideoMethod([id]);
    return id;
  }
);

const ReelsSlice = createSlice({
  name: "reels",
  initialState,
  reducers: {
    setSelectedReels: (state, action) => {
      state.selectedReels = action.payload;
    },
    clearSelectedReels: (state) => {
      state.selectedReels = [];
    }
  },
  extraReducers: (builder) => {
    // todo => add reels
    builder.addCase(AddReelsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AddReelsAction.fulfilled, (state, action) => {
      state.reels.unshift(action.payload.data);
      // Update total count when adding new image
      state.meta.total += 1;
      // Recalculate total pages
      state.meta.totalPages = Math.ceil(state.meta.total / state.meta.limit);
      state.isLoading = false;
    });
    builder.addCase(AddReelsAction.rejected, (state) => {
      state.isLoading = false;
    });

    // todo => get all reels
    builder.addCase(getReelsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getReelsAction.fulfilled, (state, action) => {
      state.reels = action.payload.data;
      state.meta = action.payload.meta;
      state.isLoading = false;
    });
    builder.addCase(getReelsAction.rejected, (state) => {
      state.isLoading = false;
    });

    // todo => delete reels
    builder.addCase(deleteReelsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteReelsAction.fulfilled, (state, action) => {
      const deletedCount = action.payload.length;
      state.reels = state.reels.filter(
        (img) => !action.payload.includes(img._id)
      );
      state.selectedReels = state.selectedReels.filter((id) => !action.payload.includes(id));
      state.meta.total -= deletedCount;
      state.meta.totalPages = Math.ceil(state.meta.total / state.meta.limit);
      if (state.reels.length === 0 && state.meta.page > 1) {
        state.meta.page -= 1;
      }
      if(state.meta.page > state.meta.totalPages && state.meta.totalPages > 0) {
        state.meta.page = state.meta.totalPages
      }
      state.isLoading = false;
    });
    builder.addCase(deleteReelsAction.rejected, (state) => {
      state.isLoading = false;
    });

    //  todo => delete one reel
    builder.addCase(deleteOneReelAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteOneReelAction.fulfilled, (state, action) => {
      state.reels = state.reels.filter((img) => img._id !== action.payload);
      state.selectedReels = state.selectedReels.filter((id) => id !== action.payload);
      state.meta.total -= 1;
      state.meta.totalPages = Math.ceil(state.meta.total / state.meta.limit);
      if (state.reels.length === 0 && state.meta.page > 1) {
        state.meta.page -= 1;
      }
      if(state.meta.page > state.meta.totalPages && state.meta.totalPages > 0) {
        state.meta.page = state.meta.totalPages
      }
      state.isLoading = false;
    });
    builder.addCase(deleteOneReelAction.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setSelectedReels , clearSelectedReels } = ReelsSlice.actions;
export const reelsSelector = (state: RootState) => state.reels;
export default ReelsSlice.reducer;
