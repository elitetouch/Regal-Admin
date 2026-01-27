"use client";
import React from "react";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { Images } from "../public/Images/images";
import { InputComponent } from "../(Pages)/AddProduct/page";
import { Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import { SignInFieldSchemma } from "../Components/Schemmas/RegalSchemma";
type signInTypes = {
  email: string;
  password: string | number;
};
function LogInScreen() {
  const router = useRouter();
  return (
    <div className=" bg-[#5b2a2e3c] min-h-[100vh] w-full grid items-center ">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values: signInTypes) => {
          console.log({ values: values });
          router.push("/ProductPages");
          //   router.push("/SignUp");
        }}
        validationSchema={SignInFieldSchemma}
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
        }) => (
          <Box className=" bg-white w-5/12 rounded-lg shadow-lg m-auto">
            <Box className=" w-10/12 m-auto pb-[40px]">
              <Box>
                <Box className=" grid w-full justify-center pt-[30px] pb-[20px]">
                  <Image src={Images.regalLogo} alt="" />
                </Box>
              </Box>
              <Box className=" grid gap-y-[20px]">
                <InputComponent
                  name="email"
                  label="Email"
                  placing="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email ? errors.email : undefined}
                />

                <InputComponent
                  name="password"
                  label="Password"
                  placing="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password ? errors.password : undefined}
                />

                {/* <InputComponent label="Confirm Password" placing="Name" /> */}
              </Box>
              <Box className=" w-full mt-[20px] m-auto">
                <Button
                  backgroundColor={"#5b2a2e3c"}
                  width={"full"}
                  onClick={() => {
                    handleSubmit();
                  }}
                  isDisabled={!isValid}
                  //onClick={() => router.push("/ProductPages")}
                >
                  <Text>Log in</Text>
                </Button>
                <Box className=" grid justify-end mt-[20px]">
                  <Button
                    backgroundColor={"#5b2a2e3c"}
                    onClick={() => {
                      router.push("/SignUp");
                    }}
                  >
                    <Text>Sign up</Text>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Formik>
    </div>
  );
}

export default LogInScreen;
