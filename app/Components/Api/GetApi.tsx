import { useQuery } from "@tanstack/react-query";
import { Api_Instance } from "./Api";
export const getProducts = () => {
  const { isPending, error, data }: any = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await Api_Instance.get("/products");
      return response;
    },
  });
  return { isPending, error, data };
};
export const getUser = () => {
  const { isPending, error, data }: any = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await Api_Instance.get("/profile");
      return response;
    },
  });
  return { isPending, error, data };
};
export const getSingleProduct = (id: string) => {
  const { isPending, error, data }: any = useQuery({
    queryKey: ["singleProduct"],
    queryFn: async () => {
      const response = await Api_Instance.get(`/products/${id}`);
      return response;
    },
  });
  return { isPending, error, data };
};
