"use client";
import { useGetProductsQuery } from "@/state/api";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: products,
    isError,
    isLoading,
  } = useGetProductsQuery(searchTerm);

  if (isLoading) {
    return <div className="py-4">LOADING....</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">Can't get Products</div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6 ">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
