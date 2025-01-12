import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./initialData";
export default configureStore({
  reducer: {
    data: dataSlice,
  },
});
