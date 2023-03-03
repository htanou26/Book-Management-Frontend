import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import productReducer from "../redux/features/product/productSlice";
import filterReducer from "../redux/features/product/filterSlice";
import categoryReducer from "./features/categorys/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    filter: filterReducer,
  },
});
