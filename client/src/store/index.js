import { configureStore } from "@reduxjs/toolkit";
import Auth from "./Auth";
import Jobs from "./Jobs";

const store = configureStore({
  reducer: {
    auth: Auth,
    jobs: Jobs,
  },
});

export default store;
