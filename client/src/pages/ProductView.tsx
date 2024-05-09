import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";


import {
  getProduct,
 
} from "../queries";

const ProductView = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState<number>(1);

  const { isPending, data } = useQuery({
    queryKey: ["products", "product", id],
    queryFn: () => getProduct(id as string),
  });


  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => {
    if (quantity - 1 > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (isPending) return <h1>Loading...</h1>;
  return (
    <section className="w-full max-w-[700px] mx-auto">
      <div className="grid md:grid-cols-2 md:gap-7 gap-2.5">
        <img
          src={data?.productImage}
          className="w-full aspect-square rounded-md"
        />
        <div className="">
          <h1 className="text-lg text-gray-700">{data?.name}</h1>
          <p className="mt-1">
            {data?.price === 0 ? (
              <span className="text-orange-700">FREE</span>
            ) : (
              "$" + data?.price
            )}
          </p>
          <div className="mt-5">
            <div className="flex items-center gap-2">
              <label htmlFor="quantity" className="">
                Quantity:
              </label>
              <div className="flex items-center gap-1">
                <ChevronLeft
                  size={22}
                  onClick={handleDecrement}
                  className="cursor-pointer"
                />
                <p className="font-bold text-teal-600 select-none w-5 text-center">
                  {quantity}
                </p>
                <ChevronRight
                  size={22}
                  onClick={handleIncrement}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <button className="mt-3 select-none bg-purple-700 py-2 px-8 rounded text-white">Add to Cart</button>
          </div>
        </div>
      </div>
     
    </section>
  );
};

export default ProductView;

