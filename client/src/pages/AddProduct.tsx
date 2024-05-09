import { useAppContext } from "../provider";
import React, { useState } from "react";
import Button from "../components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "../queries";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

const AddProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [prevousFile, setPreviousFile] = useState<File>();
  const [preview, setPreview] = useState<string>(state.image as string);

  

  const { mutate, isPending, error } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] }), navigate("/");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productData = new FormData(e.target as HTMLFormElement);
    productData.append("productOwnerId", state._id as string);

    mutate(productData);
  };
  if (error instanceof AxiosError) {
    if (error?.response?.data.message !== "Token has expired") {
      alert(error?.response?.data.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[450px] border-2 border-purple-500 mx-auto p-5 rounded-md flex flex-col gap-5"
    >
      <div className="col-span-6 add-product-group flex flex-col gap-1.5">
        <label htmlFor="product-name" className="">
          Product Name
        </label>
        <input
          name="name"
          className="p-1.5 rounded"
          type="text"
          id="product-name"
          placeholder=""
          required
        />
      </div>
      <div className="col-span-6 add-product-group flex flex-col gap-1.5">
        <label htmlFor="product-price" className="">
          Price
        </label>
        <input
          name="price"
          className="p-1.5 rounded"
          type="text"
          id="product-price"
          required
        />
      </div>
      <div className="flex relative col-span-6">
        <input
        
          type="file"
          name="product_photo"
          accept="jpg, jpeg, png"
          required
        />
        
      </div>
      
      <button className="self-start py-2 px-8 rounded mt-3 bg-purple-500 text-white"
       disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default AddProduct;
