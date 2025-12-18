import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";
import { IImage, IMediaItem } from "@/lib/Interfaces/ImgInterface";
import {
  AddImageMethod,
  deleteImageMethod,
  getImagesMethod,
} from "@/lib/api/img";

interface IState {
  images: IMediaItem[];
  isLoading: boolean;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  selectedImages: string[];
}

const initialState: IState = {
  images: [],
  isLoading: false,
  meta: {
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 1,
  },
  selectedImages: [],
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

export const getImagesAction = createAsyncThunk(
  "img/getImages",
  async ({ page = 1, limit = 5 }: { page?: number; limit?: number }) => {
    const res = await getImagesMethod({ page, limit });
    return res;
  }
);

export const deleteImgsAction = createAsyncThunk(
  "img/deleteImgs",
  async (ids: string[]) => {
    await deleteImageMethod(ids);
    return ids;
  }
);

export const deleteOneImgAction = createAsyncThunk(
  "img/deleteOneImg",
  async (id: string) => {
    await deleteImageMethod([id]);
    return id;
  }
);

const ImgSlice = createSlice({
  name: "img",
  initialState,
  reducers: {
    setSelectedImages: (state, action) => {
      state.selectedImages = action.payload;
    },
    clearSelectedImages: (state) => {
      state.selectedImages = [];
    },
  },
  extraReducers: (builder) => {
    // todo => add images
    builder.addCase(AddImageAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AddImageAction.fulfilled, (state, action) => {
      state.images.unshift(action.payload.data);
      // Update total count when adding new image
      state.meta.total += 1;
      // Recalculate total pages
      state.meta.totalPages = Math.ceil(state.meta.total / state.meta.limit);
      state.isLoading = false;
    });
    builder.addCase(AddImageAction.rejected, (state) => {
      state.isLoading = false;
    });

    // todo => get all images
    builder.addCase(getImagesAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getImagesAction.fulfilled, (state, action) => {
      state.images = action.payload.data;
      state.meta = action.payload.meta;
      state.isLoading = false;
    });
    builder.addCase(getImagesAction.rejected, (state) => {
      state.isLoading = false;
    });

    // todo => delete images
    builder.addCase(deleteImgsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteImgsAction.fulfilled, (state, action) => {
      const deletedCount = action.payload.length;

      state.images = state.images.filter(
        (img) => !action.payload.includes(img._id)
      );
      // Remove deleted images from selection
      state.selectedImages = state.selectedImages.filter(
        (id) => !action.payload.includes(id)
      );

      // Update total count
      state.meta.total -= deletedCount;
      // Recalculate total pages
      state.meta.totalPages = Math.ceil(state.meta.total / state.meta.limit);
      // If current page is now empty and we're not on page 1, go back one page
      if (state.images.length === 0 && state.meta.page > 1) {
        state.meta.page -= 1;
      }
      // Ensure we don't exceed total pages
      if (
        state.meta.page > state.meta.totalPages &&
        state.meta.totalPages > 0
      ) {
        state.meta.page = state.meta.totalPages;
      }
      state.isLoading = false;
    });
    builder.addCase(deleteImgsAction.rejected, (state) => {
      state.isLoading = false;
    });

    // todo => delete one image
    builder.addCase(deleteOneImgAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteOneImgAction.fulfilled, (state, action) => {
      state.images = state.images.filter((img) => img._id !== action.payload);
      state.selectedImages = state.selectedImages.filter(
        (id) => id !== action.payload
      );
      // Update total count
      state.meta.total -= 1;
      // Recalculate total pages
      state.meta.totalPages = Math.ceil(state.meta.total / state.meta.limit);
      // If current page is now empty and we're not on page 1, go back one page
      if (state.images.length === 0 && state.meta.page > 1) {
        state.meta.page -= 1;
      }
        // Ensure we don't exceed total pages
      if (state.meta.page > state.meta.totalPages && state.meta.totalPages > 0) {
        state.meta.page = state.meta.totalPages;
      }
      state.isLoading = false;
    });
    builder.addCase(deleteOneImgAction.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setSelectedImages , clearSelectedImages } = ImgSlice.actions;
export const imgSelector = (state: RootState) => state.img;
export default ImgSlice.reducer;
