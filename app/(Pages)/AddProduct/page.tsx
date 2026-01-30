"use client";
import React from "react";
import Image from "next/image";
import { Images } from "@/app/public/Images/images";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { robotoSlab } from "@/app/Components/Fonts/Font";
import { RegalIcons } from "@/app/public/Icons/Icons";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { AddProductSchemma } from "@/app/Components/Schemmas/RegalSchemma";
import { Api_Instance } from "@/app/Components/Api/Api";
import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { getSingleProduct } from "@/app/Components/Api/GetApi";

type InputComponentProps = {
  name: string;
  placing: string;
  label?: string;
  value?: string | number;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};
type addProductTypes = {
  productName: string | any;

  productPrice: string;
  ProductsImage: any;
  Productstatus: string;
};
export const InputComponent = ({
  name,
  placing,
  label,
  value,
  error,
  onChange,
  onBlur,
}: InputComponentProps) => (
  <div>
    {label && (
      <label
        style={{
          display: "block",
          marginBottom: 12,
          fontWeight: 600,
          color: "#5B2A2E",
        }}
      >
        {label}
      </label>
    )}

    <Input
      name={name}
      height={14}
      placeholder={placing}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />

    {error && <Text className="text-[12px] text-red-600">{error}</Text>}
  </div>
);

type SelectComponentProps = {
  name: string;
  options: string[];
  placing: string;
  label?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
  error?: string;
};

const SelectComponent = ({
  name,
  options,
  placing,
  label,
  value,
  onChange,
  onBlur,
  error,
}: SelectComponentProps) => (
  <div>
    {label && (
      <label style={{ display: "block", marginBottom: 12, fontWeight: 600 }}>
        {label}
      </label>
    )}

    <Select
      name={name}
      placeholder={placing}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    >
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </Select>

    {error && <Text className="text-[12px] text-red-600">{error}</Text>}
  </div>
);

type FileUploadProps = {
  label?: string;
  accept?: string;
  value: File | null; // Formik value
  onChange: (file: File | null) => void;
  error: string;
};

const FileUploadComponent = ({
  label,
  accept,
  value, // intentionally unused (file inputs can't be controlled)
  onChange,
  error,
}: FileUploadProps) => (
  <div>
    {label && (
      <label style={{ display: "block", marginBottom: 12, fontWeight: 600 }}>
        {label}
      </label>
    )}

    <Input
      height={14}
      type="file"
      accept={accept}
      onChange={(e) => {
        const file = e.target.files?.[0] ?? null;
        onChange(file);
      }}
    />
    {error && <Text className="text-[12px] text-red-600">{error}</Text>}
  </div>
);

function Page() {
  const queryClient: any = useQueryClient();
  const searchParams = useSearchParams();
  const productId: any = searchParams.get("ProductId");
  console.log({ id: productId });
  const {
    data: productData,
    isPending: productPending,
    error: productError,
  } = getSingleProduct(productId);
  console.log(productData?.data?.data);
  const singleProduct = productData?.data?.data;
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();
  const router = useRouter();
  const createProductFunction = async (values: addProductTypes) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.productName);
    formData.append("price", values.productPrice);
    formData.append("image", values.ProductsImage);
    formData.append("status", values.Productstatus);
    try {
      const resp = await Api_Instance.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Example: save token
      resp && queryClient.invalidateQueries();
      toast({
        title: "Success",
        description: "Product created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      router.push("/ProductPages");
    } catch (error: any) {
      console.error(error);
      setLoading(false);
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  const editProductFunction = async (values: addProductTypes) => {
    if (!singleProduct) return;

    setLoading(true);
    const formData = new FormData();

    // ✅ Name
    if (values.productName !== singleProduct.name) {
      formData.append("name", values.productName);
    }

    // ✅ Price
    if (values.productPrice !== singleProduct.price) {
      formData.append("price", values.productPrice);
    }

    // ✅ Status
    if (values.Productstatus !== singleProduct.status) {
      formData.append("status", values.Productstatus);
    }

    // ✅ Image (only if a NEW file was selected)
    if (values.ProductsImage instanceof File) {
      formData.append("image", values.ProductsImage);
    }

    // 🚫 Nothing changed → stop request
    if ([...formData.entries()].length === 0) {
      toast({
        title: "No changes detected",
        status: "info",
        duration: 3000,
        position: "top-right",
      });
      setLoading(false);
      return;
    }

    try {
      const resp = await Api_Instance.patch(
        `/products/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      queryClient.invalidateQueries(["products"]);

      toast({
        title: "Success",
        description: "Product updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      router.push("/ProductPages");
    } catch (error: any) {
      console.error(error);

      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Formik
        enableReinitialize
        initialValues={{
          productName: singleProduct ? singleProduct?.name : "",
          productPrice: singleProduct ? singleProduct?.price : "",
          ProductsImage: singleProduct ? singleProduct?.image_url : "",
          Productstatus: singleProduct ? singleProduct?.status : "",
        }}
        onSubmit={(values: addProductTypes) => {
          console.log({ values: values });
          !singleProduct
            ? createProductFunction(values)
            : editProductFunction(values);
          // router.push("/ProductPages");
          //   router.push("/SignUp");
        }}
        validationSchema={AddProductSchemma}
        validateOnMount
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            <div className=" grid  lg:gap-x-[40px] gap-x-[5px] w-11/12  m-auto mt-[20px] bg-white rounded-lg relative shadow-lg">
              <div className=" lg:col-span-5 col-span-9  w-full">
                <div className=" lg:w-10/12 w-11/12  lg:pt-[60px] pt-[20px] pb-[40px] lg:pb-[80px] lg:pl-[20px] m-auto ">
                  <div className=" lg:w-10/12 w-11/12 m-auto lg:m-0 ">
                    <div>
                      <div className={`${robotoSlab.className}`}>
                        <Text className=" text-5xl text-[#5B2A2E] font-extrabold">
                          Add<span className=" text-[#BE1011]"> Products</span>
                        </Text>
                      </div>
                      <div className=" mt-[20px] pb-[20px]">
                        <Text>
                          Please kindly input necessary details about the
                          product
                        </Text>
                      </div>
                    </div>
                    <div className=" grid gap-y-[20px]">
                      <InputComponent
                        name="productName"
                        label="Product Name"
                        placing={
                          singleProduct ? singleProduct?.name : "product name"
                        }
                        value={values.productName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        //@ts-ignore
                        error={
                          touched.productName ? errors.productName : undefined
                        }
                      />
                      <InputComponent
                        name="productPrice"
                        label="Product Price"
                        placing={
                          singleProduct ? singleProduct?.price : "product price"
                        }
                        value={values.productPrice}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        //@ts-ignore
                        error={
                          touched.productPrice ? errors.productPrice : undefined
                        }
                      />
                      {/* <InputComponent label="Phone number" placing="Phone Number" /> */}
                      <SelectComponent
                        name="Productstatus"
                        label="Status"
                        placing={
                          singleProduct
                            ? singleProduct?.status
                            : "Upload product status"
                        }
                        options={["in_stock", "out_of_stock"]}
                        value={values.Productstatus}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        //@ts-ignore
                        error={
                          touched.Productstatus
                            ? errors.Productstatus
                            : undefined
                        }
                      />

                      <div>
                        <FileUploadComponent
                          label="Profile Image"
                          accept="image/*"
                          value={values.ProductsImage}
                          onChange={(val) =>
                            setFieldValue("ProductsImage", val)
                          }
                          // @ts-ignore
                          error={errors.ProductsImage || ""}
                        />
                        <Text className=" text-[14px] pt-[5px] text-[#BE1011]">
                          Must not exceed 10mb file size
                        </Text>
                      </div>
                    </div>
                    <div className=" pt-[30px]">
                      <Button
                        bg=" #BE1011"
                        border="1px solid #BE1011"
                        h="60px"
                        w="200px"
                        onClick={() => handleSubmit()}
                        isDisabled={!isValid}
                        isLoading={loading}
                      >
                        {loading ? (
                          <Text className=" text-[18px]" color="white">
                            Loading...
                          </Text>
                        ) : (
                          <Text className=" text-[18px]" color="white">
                            {singleProduct ? "EDIT" : "SEND"}
                          </Text>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className=" lg:col-span-2 col-span-1 bg-[#5B2A2E] rounded-r-lg"></div>
        <div className=" absolute right-9 h-[200px] top-2/12 lg:grid hidden">
          <Image alt="" src={Images.map} height={550} />
        </div> */}
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}

export default Page;
