import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "../../api/axios";

//goi API lay tat ca thong tin products
export const getAllProducts = createAsyncThunk(
  "getAllProducts",
  async ({ searchText, sort }) => {
    // console.log(searchText);
    if (searchText !== undefined || sort !== undefined) {
      const response = await instance.get(
        `products?_sort=price&_order=${sort}&product_name_like=${searchText}`
        //&_sort=${sort}&_order=desc`
      );
      return response.data;
    } else {
      const response = await instance.get(`products/?_sort=price&_order=asc`);
      return response.data;
    }
  }
);

// ================================================================
//goi API xoa thong tin 1 sp theo id
export const deleteProductById = createAsyncThunk(
  "deleteProductById",
  async (id) => {
    const response = await instance.delete(`products/${id}`);
    return id;
  }
);

//===============================================================
export const addProduct = createAsyncThunk("addProduct", async (newProduct) => {
  const response = await instance.post(`products`, newProduct);
  return newProduct;
});

//edit===============================================================
export const editProduct = createAsyncThunk("editProduct", async (product) => {
  const response = await instance.put(`products/${product.id}`, product);
  return response.data;
});

//================================================================
const managerProductSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    status: "...",
    error: null,
    isLoadingGet: false,
    isLoadingChange: false,
  },
  // reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        return {
          ...state,
          status: "Loading",
          isLoadingGet: true,
        };
      }) //trang thai cho
      .addCase(getAllProducts.fulfilled, (state, action) => {
        return {
          ...state,
          status: "ok",
          data: action.payload,
          isLoadingGet: false,
        };
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        // console.log("that bai !");
        return {
          ...state,
          status: "err",
          error: action.error.message,
          isLoadingGet: false,
        };
      })
      .addCase(deleteProductById.pending, (state) => {
        return {
          ...state,
          status: "pending delete",
          isLoadingChange: true,
        };
      })
      .addCase(deleteProductById.fulfilled, (state) => {
        return {
          ...state,
          status: "ok delete",
          isLoadingChange: false,
        };
      })
      .addCase(deleteProductById.rejected, (state) => {
        return {
          ...state,
          status: "xoa that bai",
          isLoadingChange: false,
        };
      })
      .addCase(addProduct.pending, (state, action) => {
        return {
          ...state,
          status: "cho add",
          isLoadingChange: true,
        };
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        return {
          ...state,
          status: "them thanh cong",
          isLoadingChange: false,
        };
      })
      .addCase(addProduct.rejected, (state) => {
        return {
          ...state,
          status: "them that bai",
          isLoadingChange: false,
        };
      })
      .addCase(editProduct.pending, (state) => {
        return {
          ...state,
          status: "cho sua",
          isLoadingChange: true,
        };
      })
      .addCase(editProduct.fulfilled, (state) => {
        return {
          ...state,
          status: "sua thanh cong",
          isLoadingChange: false,
        };
      })
      .addCase(editProduct.rejected, (state) => {
        return {
          ...state,
          status: "sua that bai",
          isLoadingChange: false,
        };
      });
  },
});

export default managerProductSlice.reducer;
