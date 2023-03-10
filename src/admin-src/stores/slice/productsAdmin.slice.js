import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProductsAdmin, fetchDeleteProductAdmin, fetchProductsListAdmin } from "../actions/productsAdmin.action";

const productsAdminInitialState = {
  allProducts: [],
  listProducts: [],
  productDetail: {},
  textSearch: "",
  filter: {},
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  isDeleteProductSuccess: false,

  fetchingProductsAdmin: false,
};

const productsAdminSlice = createSlice({
  name: "productsAdmin",
  initialState: productsAdminInitialState,
  reducers: {
    changeTextSearch: (state, action) => {
        state.textSearch = action.payload;
      },
  },
  extraReducers: (builder) => {
    //fetchProductsListAdminAdmin
    builder.addCase(fetchProductsListAdmin.pending, (state, action) => {
      state.fetchingProductList = true;
    });
    builder.addCase(fetchProductsListAdmin.fulfilled, (state, action) => {
      const { listProducts, textSearch, filter, pagination } = action.payload;
      state.fetchingProductList = false;
      state.listProducts = listProducts;
      state.textSearch = textSearch;
      state.filter = filter;
      state.pagination = pagination;
      state.isDeleteProductSuccess = false
    });
    builder.addCase(fetchProductsListAdmin.rejected, (state, action) => {
      state.fetchingProductList = false;
    });

    //fetchAllProductsAdmin
    builder.addCase(fetchAllProductsAdmin.pending, (state, action) => {
      state.fetchingProductsAdmin = true;
    });
    builder.addCase(fetchAllProductsAdmin.fulfilled, (state, action) => {
      state.allProducts = action.payload
      state.fetchingProductsAdmin = false;

    });
    builder.addCase(fetchAllProductsAdmin.rejected, (state, action) => {
      state.fetchingProductsAdmin = false;
    });

    //fetchDeleteProductAdmin
    builder.addCase(fetchDeleteProductAdmin.pending, (state, action) => {
      state.fetchingProductsAdmin = true;
    });
    builder.addCase(fetchDeleteProductAdmin.fulfilled, (state, action) => {
      state.fetchingProductsAdmin = false;
      state.isDeleteProductSuccess = true;
    });
    builder.addCase(fetchDeleteProductAdmin.rejected, (state, action) => {
      state.fetchingProductsAdmin = false;
    });
  },
});

export const productsAdminReducer = productsAdminSlice.reducer;
export const { changeTextSearch } = productsAdminSlice.actions;

