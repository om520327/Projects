"use client";

import { useGetProductsQuery } from "@/state/api";

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <div className="py-4">LOADING....</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">Can't get Products</div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
    </div>
  );
};

export default Inventory;
