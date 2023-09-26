import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "../../api/axios";

//goi API lay tat ca du lieu
export const getUser = createAsyncThunk(
  "getUser",
  async ({ searchText, sort }) => {
    if (searchText !== undefined || sort !== undefined) {
      const response = await instance.get(
        `users?_sort=id&_order=${sort}&fullname_like=${searchText}`
        // &_page=1&limit=5 - phan trang
        //&_sort=${sort}&_order=desc - sort
      );
      // console.log(response.data);
      return response.data;
    } else {
      const response = await instance.get(`users/?_sort=id&_order=asc`);
      // console.log(response.data);
      return response.data;
    }
  }
);
//================================================
//goi API de sua trang thai du lieu
export const changeActiveUser = createAsyncThunk(
  "changeActiveUser",
  async (user) => {
    await instance.patch(`users/${user.id}`, {
      active: !user.active,
    });
    return user.id;
  }
);
//================================================================
//goi API lay du lieu theo id
export const getUserById = createAsyncThunk("getUserById", async (user) => {
  await instance.get(`users/${user.id}`);
  console.log(response.data);
  return response.data;
});

//====================================================================
const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    mess: "no mess",
    isLoadingGet: false,
    isLoadingChange: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        return {
          ...state,
          mess: "pending",
          isLoadingGet: true,
        };
      })
      .addCase(getUser.fulfilled, (state, action) => {
        // console.log("action.payload", action.payload);
        return {
          ...state,
          mess: "ok",
          data: action.payload,
          isLoadingGet: false,
        };
      })
      .addCase(getUser.rejected, (state) => {
        return {
          ...state,
          mess: "no",
          isLoadingGet: false,
        };
      })
      .addCase(changeActiveUser.pending, (state) => {
        return {
          ...state,
          mess: "pending",
          isLoadingChange: true,
        };
      })
      .addCase(changeActiveUser.fulfilled, (state) => {
        return {
          ...state,
          mess: "oke",
          isLoadingChange: false,
        };
      })
      .addCase(changeActiveUser.rejected, (state) => {
        return {
          ...state,
          mess: "no",
          isLoadingChange: false,
        };
      })
      .addCase(getUserById.pending, (state) => {
        return {
          ...state,
          mess: "cho",
          isLoadingChange: true,
        };
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        return {
          ...state,
          mess: "ok",
          data: action.payload,
          isLoadingChange: false,
        };
      })
      .addCase(getUserById.rejected, (state) => {
        return {
          ...state,
          mess: "loi",
          isLoadingChange: false,
        };
      });
  },
});

export default userSlice.reducer;
