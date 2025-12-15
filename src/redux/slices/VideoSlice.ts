import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";
import { IImage, IMediaItem } from "@/lib/Interfaces/ImgInterface";
import {
  AddVideoMethod,
  deleteVideoMethod,
  getVideosMethod,
} from "@/lib/api/video";

interface IState {
  videos: IMediaItem[];
  isLoading: boolean;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  selectedVideos: string[];
}

const initialState: IState = {
  videos: [],
  isLoading: false,
  meta: {
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 1,
  },
  selectedVideos: [],
};

export const AddVideoAction = createAsyncThunk(
  "img/addImage",
  async (data: IImage, thunkAPI) => {
    try {
      const res = await AddVideoMethod(data);
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

export const getVideosAction = createAsyncThunk(
  "img/getVideo",
  async ({ page = 1, limit = 5 }: { page?: number; limit?: number }) => {
    const res = await getVideosMethod({ page, limit });
    return res;
  }
);

export const deleteVideosAction = createAsyncThunk(
  "img/deleteVideo",
  async (ids: string[]) => {
    await deleteVideoMethod(ids);
    return ids;
  }
);

export const deleteOneVideoAction = createAsyncThunk(
  "img/deleteOneVideo",
  async (id: string) => {
    await deleteVideoMethod([id]);
    return id;
  }
);

const VideoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setSelectedVideos: (state, action) => {
      state.selectedVideos = action.payload;
    },
  },
  extraReducers: (builder) => {
    // todo => add images
    builder.addCase(AddVideoAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AddVideoAction.fulfilled, (state, action) => {
      state.videos.unshift(action.payload.data);
      state.isLoading = false;
    });
    builder.addCase(AddVideoAction.rejected, (state) => {
      state.isLoading = false;
    });

    // todo => get all images
    builder.addCase(getVideosAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getVideosAction.fulfilled, (state, action) => {
      state.videos = action.payload.data;
      state.meta = action.payload.meta;
      state.isLoading = false;
    });
    builder.addCase(getVideosAction.rejected, (state) => {
      state.isLoading = false;
    });

    // todo => delete images
    builder.addCase(deleteVideosAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteVideosAction.fulfilled, (state, action) => {
      state.videos = state.videos.filter(
        (img) => !action.payload.includes(img._id)
      );
      state.isLoading = false;
    });
    builder.addCase(deleteVideosAction.rejected, (state) => {
      state.isLoading = false;
    });

    // todo => delete one image
    builder.addCase(deleteOneVideoAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteOneVideoAction.fulfilled, (state, action) => {
      state.videos = state.videos.filter((img) => img._id !== action.payload);
      state.isLoading = false;
    });
    builder.addCase(deleteOneVideoAction.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setSelectedVideos } = VideoSlice.actions;
export const videoSelector = (state: RootState) => state.video;
export default VideoSlice.reducer;
