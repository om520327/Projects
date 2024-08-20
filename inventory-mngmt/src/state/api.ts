import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export interface Product {}
export interface SalesSummary {}
export interface PurchaseSummary {}
export interface ExpenseSummary {}
export interface ExpenseByCategorySummary {}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics"],
  endpoints: (build) => ({
    /* to make api call from frontend to backend we will use 
     reduxjs/toolkit/query. we will create a type called "DashboardMetrics" 
     (what we want / type/value we are getting from backend) "void" is what we are
     sending to the query. in our case it is void because this is a getReq   */
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      // appends "/dashboard" to our baseUrl
      query: () => "/dashboard",
      /* when we get our data from BE to FE in this specific 
      case from "dashboardController", we can specify a tag 
      in which that data is saved this is good for  
      when the you feel the data is invalidated and 
      need to update (refetch API for updated set of data)*/
      providesTags: ["DashboardMetrics"],
    }),
  }),
});

export const {} = api;
