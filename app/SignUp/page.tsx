"use client";
import React from "react";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { Images } from "../public/Images/images";
import { InputComponent } from "../(Pages)/AddProduct/page";
import { Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { SignupSchemma } from "../Components/Schemmas/RegalSchemma";
import { Formik } from "formik";
import { useToast } from "@chakra-ui/react";
import { Api_Instance } from "../Components/Api/Api";
type SignUpTypes = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

function SignUpScreen() {
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();
  const router = useRouter();
  const signUpFunction = async (values: SignUpTypes) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("name", values.name);
    formData.append("password", values.password);
    formData.append("password_confirmation", values.confirmPassword);
    try {
      const resp = await Api_Instance.post("/register", formData);

      // Example: save token
      localStorage.setItem("token", resp.data.token);

      toast({
        title: "Success",
        description: "Registeration successful",
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
  return (
    <div className=" bg-[#5b2a2e3c] min-h-[100vh] w-full grid items-center ">
      <Formik
        initialValues={{
          email: "",
          name: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values: SignUpTypes) => {
          console.log({ values: values });

          signUpFunction(values);
        }}
        validationSchema={SignupSchemma}
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
                <Box className=" grid w-full justify-center pt-[20px] pb-[20px]">
                  <Image src={Images.regalLogo} alt="" />
                </Box>
              </Box>
              <Box className=" grid gap-y-[20px]">
                <InputComponent
                  name="name"
                  label="Name"
                  placing="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name ? errors.name : undefined}
                />
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
                <InputComponent
                  name="confirmPassword"
                  label="Confirm Password"
                  placing="confirm password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.confirmPassword ? errors.confirmPassword : undefined
                  }
                />
              </Box>
              <Box className=" w-full mt-[20px] m-auto">
                <Button
                  backgroundColor={"#5b2a2e3c"}
                  width={"full"}
                  onClick={() => handleSubmit()}
                  isDisabled={!isValid}
                  isLoading={loading}
                >
                  {loading ? <Text>Loading...</Text> : <Text>Sign up</Text>}
                </Button>
                <Box className=" grid justify-end mt-[20px]">
                  <Button
                    backgroundColor={"#5b2a2e3c"}
                    onClick={() => router.push("/")}
                  >
                    <Text>Sign in</Text>
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

export default SignUpScreen;
