"use client";
import React from "react";
import Image from "next/image";
import { Images } from "@/app/public/Images/images";
import { Text, Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { robotoSlab } from "@/app/Components/Fonts/Font";
import { RegalIcons } from "@/app/public/Icons/Icons";
import { useSearchParams } from "next/navigation";
import { Formik } from "formik";
import { ratingsSchemma } from "../Components/Schemmas/RegalSchemma";
import { InputComponent } from "../(Pages)/AddProduct/page";
import { Api_Instance } from "../Components/Api/Api";
import { useToast } from "@chakra-ui/react";
type ratingsType = {
  productCode: string;
  rating: string;
  comment: string;
};

const SelectComponent = ({
  options,
  placing,
  label,
}: {
  options: string[];
  placing: string;
  label?: string;
}) => (
  <div>
    <label style={{ display: "block", marginBottom: 12, fontWeight: 600 }}>
      {label}
    </label>
    <Select height={14} placeholder={placing}>
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </Select>
  </div>
);
type FileUploadProps = {
  label?: string;
  accept?: string;
  onFileSelect?: (file: File | null) => void;
};

const FileUploadComponent = ({
  label,
  accept,
  onFileSelect,
}: FileUploadProps) => (
  <div>
    <label style={{ display: "block", marginBottom: 12, fontWeight: 600 }}>
      {label}
    </label>
    <Input
      height={14}
      type="file"
      // accept={accept}
      placeholder="Upload Image"
      onChange={(e) => {
        const file = e.target.files?.[0] ?? null;
        onFileSelect?.(file);
      }}
    />
  </div>
);

function Page() {
  const searchParams = useSearchParams();
  const productCode: any = searchParams.get("productCode");
  console.log({ id: productCode });
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();
  const createRatings = async (values: ratingsType) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("rating", values.rating);
    formData.append("comment", values.comment);
    formData.append("productCode", values.productCode);
    try {
      const resp = await Api_Instance.post("/ratings", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Example: save token
      resp &&
        toast({
          title: "Success",
          description: "Ratings submitted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      setLoading(false);
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
  return (
    <div className=" min-h-screen grid items-center ">
      <Formik
        validateOnMount
        initialValues={{
          productCode: productCode,
          rating: "",
          comment: "",
        }}
        validationSchema={ratingsSchemma}
        onSubmit={(values: ratingsType) => {
          console.log(values);
          createRatings(values);
        }}
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
          isSubmitting,
        }) => (
          <>
            <Box>
              <Box>
                <Box className=" grid w-full justify-center">
                  <Image src={RegalIcons.regalLogo} alt="" />
                </Box>
              </Box>
              <div className=" grid lg:grid-cols-7  lg:gap-x-[40px] gap-x-[5px] lg:w-10/12 w-10/12  m-auto  bg-white rounded-lg relative shadow-lg">
                <div className=" lg:col-span-5 col-span-9  w-full">
                  <div className=" lg:w-10/12 w-11/12  lg:pt-[60px] pt-[40px] pb-[40px] lg:pb-[80px] lg:pl-[20px] m-auto ">
                    <div className=" lg:w-10/12 w-11/12 m-auto lg:m-0 ">
                      <div>
                        <div className={`${robotoSlab.className}`}>
                          <Text className=" lg:text-5xl text-3xl text-[#5B2A2E] font-extrabold">
                            Ratings
                          </Text>
                        </div>
                        <div className=" mt-[20px] pb-[20px]">
                          <Text>Please kindly input necessary information</Text>
                        </div>
                      </div>
                      <div className=" grid gap-y-[20px]">
                        {/* <InputComponent label="Product Code" placing="product code" /> */}
                        <Box>
                          <InputComponent
                            name="rating"
                            label="Ratings"
                            placing="ratings"
                            value={values.rating}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            //@ts-ignore
                            error={touched.rating ? errors.rating : undefined}
                          />
                          <Text className=" text-[13px] mt-[10px]" color="gray">
                            ratings must be between 1 to 5
                          </Text>
                        </Box>
                        <InputComponent
                          name="comment"
                          label="Comment"
                          placing="comment"
                          value={values.comment}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          //@ts-ignore
                          error={touched.comment ? errors.comment : undefined}
                        />
                        {/* <InputComponent label="Phone number" placing="Phone Number" /> */}
                      </div>
                      <div className=" pt-[30px]">
                        <Button
                          bg=" #BE1011"
                          border="1px solid #BE1011"
                          h="60px"
                          w="200px"
                          isLoading={loading}
                          onSubmit={() => handleSubmit()}
                          isDisabled={!isValid}
                        >
                          <Text className=" text-[18px]" color="white">
                            SEND
                          </Text>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" lg:col-span-2 col-span-1 bg-[#5B2A2E] rounded-r-lg"></div>
                <div className=" absolute right-12 h-[200px] top-1/12 lg:grid hidden">
                  <Image alt="" src={Images.map} height={500} />
                </div>
              </div>
            </Box>
          </>
        )}
      </Formik>
    </div>
  );
}

export default Page;
