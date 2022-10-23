import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import axios from "axios";
import storage from "redux-persist/lib/storage";

const fetchUser = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: "aa", email: "dd" }), 2000);
  });
};

const initialState = {
  loggedIn: false,
};

export const userLogin = createAsyncThunk("user/Login", async () => {
  try {
    const res = await fetchUser(); //axios.get("");
    // console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state) => {
      return { ...state, loggedIn: true };
    },
    logout: (state) => {
      return { ...state, loggedIn: false };
    },
  },
  extraReducers: {
    [userLogin.pending]: (state, action) => {
      console.log("pending");
    },
    [userLogin.fulfilled]: (state, action) => {
      console.log("fulfilled");
      state.loggedIn = true;
    },
    [userLogin.rejected]: (state, action) => {
      console.log("rejected");
      state.loggedIn = false;
    },
    [userLogin.PURGE]: (state, action) => {
      console.log("removed");
      storage.remove("loggedIn");
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
