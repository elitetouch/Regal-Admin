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
import { useToast } from "@chakra-ui/react";
import { Api_Instance } from "../Components/Api/Api";
import { useContext } from "react";
import { UserContext } from "../Components/ProjectWrap/ProjectWrap";
type signInTypes = {
  email: string;
  password: string;
};
function LogInScreen() {
  const [loading, setLoading] = React.useState(false);
  const { user, setUser } = useContext(UserContext);
  console.log({ user: user });
  const toast = useToast();
  const router = useRouter();
  const signInFunction = async (values: signInTypes) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    try {
      const resp = await Api_Instance.post("/login", formData);
      console.log({ signInData: resp?.data?.data });

      // Example: save token
      localStorage.setItem("token", resp?.data?.data?.token);
      localStorage.setItem("user", JSON.stringify(resp?.data?.data?.user));
      const getUser = localStorage.getItem("user");
      getUser && setUser(JSON.parse(getUser));
      toast({
        title: "Success",
        description: "Login successful",
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
          password: "",
        }}
        onSubmit={(values: signInTypes) => {
          console.log({ values: values });
          signInFunction(values);
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
                  isLoading={loading}
                  isDisabled={!isValid}
                  //onClick={() => router.push("/ProductPages")}
                >
                  {loading ? <Text>Loading...</Text> : <Text>Log in</Text>}
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
