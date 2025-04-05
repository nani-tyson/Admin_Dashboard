import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { get } from "mongoose";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL,
  }), // Updated to use import.meta.env
  reducerPath: "api",
  tagTypes: ["User", "Product", "Customer", "Transactions", "Geography", "Sales", "Admin", "Performance", "Dashboard"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `user/${id}`,
      providesTags: ["User"],
    }),

    getProducts: builder.query({
      query: () => `client/products`,
      providesTags: ["Product"],
    }),

    getCustomers: builder.query({
      query: () => `client/customers`,
      providesTags: ["User"],
    }),

    getTransactions: builder.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),

    getGeography: builder.query({
      query: () => `client/GeoLocation`,
      providesTags: ["Geography"],
    }),

    getSales: builder.query({
      query: () => `sales/overview`,
      providesTags: ["Sales"],
    }),

    getAdmins: builder.query({
      query: () => `management/admin`,
      providesTags: ["Admin"],
    }),

    getPerformance: builder.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),

    getDashboard: builder.query({
      query: () => `dashboard`,
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetPerformanceQuery,
  useGetDashboardQuery
} = api;
