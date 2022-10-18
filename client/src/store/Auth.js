import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/auth",
});
const user = JSON.parse(localStorage.getItem("user"));

export const SignInHandler = createAsyncThunk(
  "auth/SignInHandler",
  async ({ formData, setAlert }) => {
    setAlert({
      isOpen: true,
      message: "Redirected..",
      variant: "success",
    });
    try {
      const { data } = await API.post("/signin", formData);
      if (data) {
        window.location.href = "/";
      }
      return data;
    } catch (err) {
      const {
        response: { data },
      } = err;

      setAlert({
        isOpen: true,
        variant: "danger",
        message: data?.msg,
      });
    }
  }
);

export const SignUpHandler = createAsyncThunk(
  "auth/SignUpHandler",
  async ({ formData, setAlert }) => {
    setAlert({
      isOpen: true,
      variant: "success",
      message: "Redirected...",
    });
    try {
      const response = await API.post("/signup", formData);
      if (response.data) {
        window.location.href = "/";
      }
      return response.data;
    } catch (err) {
      setAlert({
        isOpen: true,
        variant: "danger",
        message: err?.response?.data?.msg,
      });
    }
  }
);

export const UpdateUserHandler = createAsyncThunk(
  "patchUser",
  async ({ formData, id, setAlert }) => {
    try {
      const { data } = await API.patch(`/update/${id}`, formData);
      if (data) {
        setAlert({
          isOpen: true,
          variant: "success",
          message: "User profile was updated",
        });

        return data;
      }
    } catch (err) {
      return err;
    }
  }
);

const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    user,
    loading: false,
  },
  reducers: {
    Auth(state, { payload }) {
      state = payload;
      localStorage.setItem("user", JSON.stringify(state));
      return state;
    },
    Logout(state, { payload }) {
      state = null;
      localStorage.setItem("user", JSON.stringify(state));
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SignInHandler.fulfilled, (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
      return state;
    });
    builder.addCase(SignUpHandler.fulfilled, (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
      return state;
    });
    builder.addCase(UpdateUserHandler.pending, (state) => {
      state.loading = true;
      return state;
    });
    builder.addCase(UpdateUserHandler.fulfilled, (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));

      state.loading = false;
      return state;
    });
  },
});

export const { Auth, Logout } = AuthSlice.actions;
export default AuthSlice.reducer;
