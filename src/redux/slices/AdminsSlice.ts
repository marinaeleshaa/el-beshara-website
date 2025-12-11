import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAdmin, INewAdmin } from "@/lib/Interfaces/AdminInterface";
import {
  addAdminMethod,
  deleteAdminMethod,
  getAdminsMethod,
} from "@/lib/api/admin";
import { RootState } from "./Store";

interface IState {
  admins: IAdmin[];
  isLoading: boolean;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const initialState: IState = {
  admins: [],
  isLoading: false,
  meta: {
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 1,
  },
};

export const getAllAdminsAction = createAsyncThunk(
  "admins/getAllAdmins",
  async ({ page = 1, limit = 5 }: { page?: number; limit?: number }) => {
    const res = await getAdminsMethod({ page, limit });
    return res;
  }
);


export const deleteAdminAction = createAsyncThunk(
  "admins/deleteAdmin",
  async (id: string) => {
    await deleteAdminMethod(id);
    return id;
  }
);

export const addAdminAction = createAsyncThunk(
  "admins/addAdmin",
  async (admin: INewAdmin, thunkAPI) => {
    try {
      const res = await addAdminMethod(admin);

      if (res.status !== "success") {
        return thunkAPI.rejectWithValue(res.message);
      }

      return res.data; // admin object
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const AdminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // todo => get all admins
    builder.addCase(getAllAdminsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllAdminsAction.fulfilled, (state, action) => {
      const { data, meta } = action.payload;
      state.admins = data;
      state.meta = meta;
      state.isLoading = false;
    });

    builder.addCase(getAllAdminsAction.rejected, (state) => {
      state.isLoading = false;
    });

    // todo => add admin
    builder.addCase(addAdminAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      addAdminAction.fulfilled,
      (state, { payload }: { payload: IAdmin }) => {
        state.admins.push(payload);
        state.isLoading = false;
      }
    );
    builder.addCase(addAdminAction.rejected, (state) => {
      state.isLoading = false;
    });

    // todo => delete admin

    builder.addCase(deleteAdminAction.fulfilled, (state, { payload }) => {
      state.admins = state.admins.filter((admin) => admin._id !== payload);
    });
  },
});

export const {} = AdminsSlice.actions;
export const adminsSelector = (state: RootState) => state.admins;
export default AdminsSlice.reducer;
