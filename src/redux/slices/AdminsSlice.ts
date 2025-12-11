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
}

const initialState: IState = {
  admins: [],
  isLoading: false,
};

export const getAllAdminsAction = createAsyncThunk(
  "admins/getAllAdmins",
  async () => {
    const res = await getAdminsMethod();
    return res.data;
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
    builder.addCase(
      getAllAdminsAction.fulfilled,
      (state, { payload }: { payload: IAdmin[] }) => {
        state.admins = payload;
        state.isLoading = false;
      }
    );
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
