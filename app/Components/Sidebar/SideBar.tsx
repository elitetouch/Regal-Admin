"use client";
import React from "react";
import { Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Images } from "@/app/public/Images/images";
import Image from "next/image";
import { Api_Instance } from "../Api/Api";
import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
function SideBar() {
  const queryClient = useQueryClient();
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();
  const router = useRouter();
  const logOutFunction = async () => {
    setLoading(true);

    try {
      const resp = await Api_Instance.post("/logout");

      // Example: save token
      resp && queryClient.invalidateQueries();
      toast({
        title: "Success",
        description: "Log Out sucessfull",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      router.push("/");
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
    <div className=" w-[250px]  min-h-[95vh] shadow-lg pl-[10px] pr-[10px]">
      <div className=" mt-[20px] ">
        <div className=" w-11/12 m-auto mb-[20px]">
          <Image src={Images.regalLogo} alt="" height={100} width={100} />
        </div>
        <div
          style={{
            display: "grid",
            gap: "40px 20px",
            width: "91.6667%", // w-11/12
            margin: "0 auto",
            alignItems: "center",
            paddingTop: 20,
          }}
        >
          <div style={{ width: "100%" }}>
            <Button
              cursor={"pointer"}
              border={"1px"}
              // boxShadow={'lg'}
              shadow={"lg"}
              height={"60px"}
              backgroundColor={"transparent"}
              borderColor={"gray.200"}
              borderRadius="lg"
              className="   w-full h-[150px] rounded-lg grid items-center bg-white "
              onClick={() => router.push("/ProductPages")}
            >
              <h1
                style={{
                  fontSize: "16px",
                  color: "#5B2A2E",
                  margin: 0,
                }}
              >
                Products
              </h1>
            </Button>
          </div>

          <div style={{ width: "100%" }}>
            <Button
              cursor={"pointer"}
              border={"1px"}
              // boxShadow={'lg'}
              shadow={"lg"}
              height={"60px"}
              backgroundColor={"transparent"}
              borderColor={"gray.200"}
              borderRadius="lg"
              className="   w-full h-[150px] rounded-lg grid items-center bg-white "
              onClick={() => {
                (queryClient.invalidateQueries({ queryKey: ["products"] }),
                  router.push("/AddProduct"));
              }}
            >
              <h1
                style={{
                  fontSize: "16px",
                  color: "#5B2A2E",
                  margin: 0,
                }}
              >
                Add Product
              </h1>
            </Button>
          </div>
          <div style={{ width: "100%" }}>
            <Button
              cursor={"pointer"}
              border={"1px"}
              // boxShadow={'lg'}
              shadow={"lg"}
              height={"60px"}
              backgroundColor={"transparent"}
              borderColor={"gray.200"}
              borderRadius="lg"
              className="   w-full h-[150px] rounded-lg grid items-center bg-white "
              onClick={() => router.push("/AddUser")}
            >
              <h1
                style={{
                  fontSize: "16px",
                  color: "#5B2A2E",
                  margin: 0,
                }}
              >
                Add User
              </h1>
            </Button>
          </div>
          <div style={{ width: "100%" }}>
            <Button
              cursor={"pointer"}
              border={"1px"}
              // boxShadow={'lg'}
              shadow={"lg"}
              height={"60px"}
              backgroundColor={"transparent"}
              borderColor={"gray.200"}
              borderRadius="lg"
              className="   w-full h-[150px] rounded-lg grid items-center bg-white "
              onClick={() => logOutFunction()}
              isLoading={loading}
            >
              <h1
                style={{
                  fontSize: "16px",
                  color: "#5B2A2E",
                  margin: 0,
                }}
              >
                Log Out
              </h1>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
