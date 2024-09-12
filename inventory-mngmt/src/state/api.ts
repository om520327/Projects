import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUsers } from "../../server/src/controllers/userController";

export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}
export interface NewProduct {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}
export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}
export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}
export interface ExpenseSummary {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string;
}
export interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string;
  category: number;
  amount: string;
  date: string;
}
export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export interface User {
  userId: string;
  name: string;
  email: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Products", "Users"],
  endpoints: (build) => ({
    /* to make api call from frontend to backend we will use 
     reduxjs/toolkit/query/react. we will create a type called "DashboardMetrics" 
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
    /* we add the string for the search query we did in productController (there could or could not be a string)   */
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),
    /* MUTATION CALL (anything that is not a get,update,post,put,delete(anything that changes))*/
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      /* Everytime you create a Product the list in Products gets invalidated  meaning another API req will be sent automatically.*/
      invalidatesTags: ["Products"],
    }),
    getUsers: build.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
} = api;
