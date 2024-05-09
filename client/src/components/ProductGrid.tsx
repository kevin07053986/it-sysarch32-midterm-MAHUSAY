import { LucideShoppingBag, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductProps } from "../utils";

const ProductGrid = ({ data }: { data: ProductProps[] }) => {
  return (
    <div className="home-grid">
      {data?.map((product: ProductProps) => {
        return (
          <Link
            to={`/products/${product._id}`}
            key={product._id}
            className={`group relative grid row-span-2 gap-0 grid-rows-subgrid 
rounded-md bg-slate-50 overflow-clip 
outline-1 outline outline-slate-200 cursor-pointer
hover:bg-zinc-100 transition-all`}
          >
            <img
              src={product.productImage}
              alt="product"
              className="w-full aspect-square"
            />
            <div className="py-2 px-3">
              <h1 className="font-normal ">{product.name}</h1>
              <div className="flex justify-between mt-3">
                {product.price === 0 ? (
                  <p className=" w-full text-center text-orange-700 font-medium">
                    FREE
                  </p>
                ) : (
                  <>
                    <ShoppingCart size={20} color="purple" />
                    <p className="text-black/70">P{product.price}</p>
                  </>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductGrid;
