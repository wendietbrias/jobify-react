import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = JSON.parse(localStorage.getItem("user"));
const API = axios.create({
  baseURL: "http://localhost:8000/api/job",
});

API.interceptors.request.use((req) => {
  if (token) {
    req.headers.authorization = `bearer ${token}`;
  }

  return req;
});

export const GetAllSlice = createAsyncThunk("get", async () => {
  try {
    const { data } = await API.get(`/all`);
    return data;
  } catch (err) {
    return err;
  }
});

export const CreateJobSlice = createAsyncThunk(
  "post",
  async ({ formData, setAlert }) => {
    try {
      const { data } = await API.post(`/add`, formData);

      if (data) {
        setAlert({
          message: "1 Job was created",
          variant: "success",
          isOpen: true,
        });
      }

      return data;
    } catch (err) {
      return err;
    }
  }
);

export const DeleteJobSlice = createAsyncThunk("delete", async (id) => {
  try {
    const { data } = await API.delete(`/delete/${id}`);
    if (data) {
      return id;
    }
  } catch (err) {
    return err;
  }
});

export const UpdateJobSlice = createAsyncThunk(
  "patchJob",
  async ({ id, formData, setAlert }) => {
    try {
      const { data } = await API.patch(`/update/${id}`, formData);

      if (data) {
        setAlert({
          isOpen: true,
          message: "Job was updated",
          variant: "success",
        });
      }

      return data;
    } catch (err) {
      setAlert({
        isOpen: true,
        variant: "danger",
        message: err?.response?.data?.msg,
      });
    }
  }
);

const JobSlice = createSlice({
  name: "Jobs",
  initialState: {
    jobs: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(GetAllSlice.fulfilled, (state, action) => {
      state.jobs = action.payload;
      state.loading = false;
      return state;
    });
    builder.addCase(GetAllSlice.pending, (state) => {
      state.loading = true;
      return state;
    });
    builder.addCase(CreateJobSlice.fulfilled, (state, action) => {
      state.jobs = [...state.jobs, action.payload];
      return state;
    });
    builder.addCase(DeleteJobSlice.fulfilled, (state, action) => {
      const filtered = state.jobs.filter((item) =>
        item._id !== action?.payload ? item : ""
      );
      state = filtered;
      return state;
    });
    builder.addCase(UpdateJobSlice.fulfilled, (state, { payload }) => {
      const mapped = state.jobs.map((job) =>
        job._id === payload.id ? payload.data : job
      );
      state.jobs = mapped;
      return state;
    });
  },
});

export default JobSlice.reducer;
