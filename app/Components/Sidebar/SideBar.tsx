"use client";
import React from "react";
import { Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Images } from "@/app/public/Images/images";
import Image from "next/image";

function SideBar() {
  const router = useRouter();
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
              onClick={() => router.push("/AddProduct")}
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
              onClick={() => router.push("/Ratings")}
            >
              <h1
                style={{
                  fontSize: "16px",
                  color: "#5B2A2E",
                  margin: 0,
                }}
              >
                Ratings
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
              onClick={() => router.push("/")}
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
