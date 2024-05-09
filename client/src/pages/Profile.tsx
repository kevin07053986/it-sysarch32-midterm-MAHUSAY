import { useAppContext } from "../provider";
import { Trash2, EllipsisIcon } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProducts,  } from "../queries";
import { ProductProps } from "../utils";
import {useNavigate } from "react-router-dom";

const Profile = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [openOptions, setOpenOptions] = useState<string | null>(null);
 

  const { isPending, data } = useQuery({
    queryFn: getProducts,
    queryKey: ["products"],
  });
 

  const {
    isError: deleteError,
    error: deleteErrorProb,
    isSuccess,
    mutate,
  } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleDeleteProduct = (id: string, productImage: string) => {
    mutate({ id, owner: state._id as string, image: productImage });
    if (deleteError) alert(deleteErrorProb.message);
    if (isSuccess) navigate("/");
  };
  const ownerProducts = data?.filter(
    (product: ProductProps) => product.productOwner === state._id
  );
  return (
    <section className="h-full">
      
      {/* where the products go */}
      <section className=" pb-10">
        {isPending ? (
          <div className="grid mt-10 place-items-center">
            <p>Loading...</p>
          </div>
        ) : ownerProducts.length > 0 ? (
          <>
            <div className="home-grid">
              {ownerProducts.map((product: ProductProps) => {
                return (
                  <div
                    key={product._id}
                    className={`group relative grid row-span-3 gap-0 grid-rows-subgrid 
                rounded-md bg-slate-50 overflow-clip 
                outline-1 outline outline-slate-200 cursor-pointer
                hover:bg-zinc-100 transition-all`}
                  >
                    <img
                      src={product.productImage}
                      alt="product"
                      className="w-full aspect-square"
                    />
                    <div className="py-2 px-3 flex justify-between">
                      <h1 className="font-normal ">{product.name}</h1>
                      <p className="text-black/70">${product.price}</p>
                    </div>
                    {state._id === product.productOwner && (
                      <div className=" w-full px-1">
                         <div
                            className="flex items-center gap-1"
                            onClick={() =>
                              handleDeleteProduct(
                                product._id,
                                product.productImage
                              )
                            }
                          >
                      
                            <span className="bg-red-800 text-white w-full py-2 text-center px-8 text-sm font-normal select-none">
                              Delete
                            </span>
                          </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 font-normal">
            Nothing to display
          </div>
        )}
      </section>
    </section>
  );
};

export default Profile;
