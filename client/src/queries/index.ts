import { axiosPrivate } from "../axios/axiosPrivate";
import { ProductProps } from "../utils";

export type ProductPropsWithOwner = ProductProps & {
  productOwner: {
    name: string;
    email: string;
    image: string;
    _id: string;
  };
};

export const getProducts = async () => {
  const response = await axiosPrivate.get("/api/products");
  return response.data.products;
};

//retrieve product details
export const getProduct = async (id: string) => {
  const response = await axiosPrivate.get(`/api/products/${id}`);
  return response.data.product as ProductPropsWithOwner;
};

export const getProductsOfOwner = async (id: string) => {
  const response = await axiosPrivate.get(
    `/api/products/user/requesting-product-by/${id}`
  );
  return response.data.products;
};

export const addProduct = async (payload: FormData) => {
  const response = await axiosPrivate.post("/api/products", payload);
  return response.data.product;
};

export const deleteProduct = async ({
  id,
  owner,
  image,
}: {
  id: string;
  owner: string;
  image: string;
}) => {
  const response = await axiosPrivate.delete(
    `/api/products/${owner}/${id}?imageLink=${image}`
  );
  console.log(response);
};

export const updateProfile = async ({
  form,
  id,
  prevImage,
}: {
  form: FormData;
  id: string;
  prevImage: string;
}) => {
  const newFormData = new FormData();
  newFormData.append("profile", form.get("profile") as File);
  newFormData.append("prevImage", prevImage);
  for (let data of newFormData) {
    console.log("data", data);
  }
  const response = await axiosPrivate.patch(`/api/auth/${id}`, newFormData);
  console.log("responses", response);
  return response.data.user;
};
