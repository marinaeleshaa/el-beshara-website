import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAdmin } from "@/lib/Interfaces/AdminInterface";
import { deleteAdminMethod, getAdminsMethod } from "@/lib/api/admin";
import { RootState } from "./Store";

interface IState {
  admins: IAdmin[];
  isLoading: boolean;
  isDeleting: boolean;
}

const initialState: IState = {
  admins: [],
  isLoading: false,
  isDeleting: false,
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

const AdminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAdminsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllAdminsAction.fulfilled, (state, { payload }) => {
      state.admins = payload;
      state.isLoading = false;
    });
    builder.addCase(getAllAdminsAction.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(deleteAdminAction.pending, (state) => {
      state.isDeleting = true;
    });
    builder.addCase(deleteAdminAction.fulfilled, (state, { payload }) => {
      state.admins = state.admins.filter((admin) => admin._id !== payload);
      state.isDeleting = false;
    });
  },
});

export const {} = AdminsSlice.actions;
export const adminsSelector = (state: RootState) => state.admins;
export default AdminsSlice.reducer;
