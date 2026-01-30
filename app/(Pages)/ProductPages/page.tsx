// "use client";
// import React, { useState } from "react";
// import DataTable from "react-data-table-component";
// import { Box, Text } from "@chakra-ui/react";
// import { IconButton } from "@chakra-ui/react";
// import productOne from "../../public/productOne.svg";
// import productTwo from "../../public/productTwo.svg";
// import productThree from "../../public/productThree.svg";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// //import axiosInstance from '@/app/api/Api_Instance'
"use client";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Box, Button, Text } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import DashboardCard from "@/app/Components/DashboardCard";
import { useQueryClient } from "@tanstack/react-query";
import { getProducts } from "@/app/Components/Api/GetApi";
import Loading from "@/app/Components/loading";
import { useMemo } from "react";
import { Api_Instance } from "@/app/Components/Api/Api";
import { useToast } from "@chakra-ui/react";
import { GenerateLink } from "@/app/Components/Api/GetApi";
import { ConfirmDialog } from "@/app/Components/ConfirmDialog";
import Image from "next/image";
// // import imp from '../../main_pages/Dashboard/AddProduct'
// import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
// type productType = {
//   id: number | string;
//   price: string;
//   stockStatus: string;
//   name: string;
// };
// const ProductData: productType[] = [
//   { id: 1, name: "Product 1", price: "$10", stockStatus: "In Stock" },
//   { id: 2, name: "Product 2", price: "$20", stockStatus: "Out of Stock" },
//   { id: 3, name: "Product 3", price: "$15", stockStatus: "In Stock" },
//   { id: 4, name: "Product 4", price: "$25", stockStatus: "In Stock" },
// ];

export const TableOptions = ({ id }: { id: number | string }) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | string | null>(null);
  const openDeleteDialog = (id: number | string) => {
    setSelectedId(id);
    setIsDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;

    try {
      setDeleteLoader(true);

      await Api_Instance.delete(`/products/${selectedId}`);

      queryClient.invalidateQueries();

      toast({
        title: "Deleted",
        description: "Product deleted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setDeleteLoader(false);
      setIsDialogOpen(false);
      setSelectedId(null);
    }
  };
  const router = useRouter();
  const [displayDropDown, setDisplayDropDown] = useState(false);
  const dropDownFunc = () => {
    setDisplayDropDown(!displayDropDown);
  };
  return (
    <Box className=" flex items-center gap-x-[5px]">
      <IconButton
        aria-label=""
        onClick={() => router.push(`/AddProduct?ProductId=${id}`)}
        icon={
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 13.3335H14"
              stroke="#C8CAD8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 2.33316C11.2652 2.06794 11.6249 1.91895 12 1.91895C12.1857 1.91895 12.3696 1.95553 12.5412 2.0266C12.7128 2.09767 12.8687 2.20184 13 2.33316C13.1313 2.46448 13.2355 2.62038 13.3066 2.79196C13.3776 2.96354 13.4142 3.14744 13.4142 3.33316C13.4142 3.51888 13.3776 3.70277 13.3066 3.87435C13.2355 4.04593 13.1313 4.20184 13 4.33316L4.66667 12.6665L2 13.3332L2.66667 10.6665L11 2.33316Z"
              stroke="#C8CAD8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
      <IconButton
        aria-label=""
        isLoading={deleteLoader}
        onClick={() => openDeleteDialog(id)}
        icon={
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4H3.33333H14"
              stroke="#C8CAD8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.33203 4.00016V2.66683C5.33203 2.31321 5.47251 1.97407 5.72256 1.72402C5.9726 1.47397 6.31174 1.3335 6.66536 1.3335H9.33203C9.68565 1.3335 10.0248 1.47397 10.2748 1.72402C10.5249 1.97407 10.6654 2.31321 10.6654 2.66683V4.00016M12.6654 4.00016V13.3335C12.6654 13.6871 12.5249 14.0263 12.2748 14.2763C12.0248 14.5264 11.6857 14.6668 11.332 14.6668H4.66536C4.31174 14.6668 3.9726 14.5264 3.72256 14.2763C3.47251 14.0263 3.33203 13.6871 3.33203 13.3335V4.00016H12.6654Z"
              stroke="#C8CAD8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.66797 7.3335V11.3335"
              stroke="#C8CAD8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.33203 7.3335V11.3335"
              stroke="#C8CAD8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={confirmDelete}
        isLoading={deleteLoader}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Yes, Delete"
      />
    </Box>
  );
};

// function Products() {
//   const router = useRouter();
//   const column = [
//     {
//       name: "Products",
//       cell: (row: productType) => (
//         <div className=" flex items-center gap-x-[5px] gap-y-[5px] pt-[5px] pb-[5px]">
//           {/* <Box borderRadius={5} className='grid h-[42px] w-[42px] justify-center items-center bg-[#F6F6F6]'>
//               <Image src={`https://store.bringofresh.net/${row.images[0]}`} width={42} height={42} alt='' className='h-[42px] w-[42px]' />
//           </Box> */}

//           <Box>
//             <h1 className=" text-[#007460]">{row?.name || ""}</h1>
//           </Box>
//         </div>
//       ),
//     },
//     {
//       name: "Price",
//       cell: (row: productType) => (
//         <div>
//           <h1 className="text-[12px]"> {row?.price || ""}</h1>
//         </div>
//       ),
//     },
//     {
//       name: "Status",
//       wrap: true,
//       cell: (row: productType) => (
//         <Box>
//           <h1
//             className={`${(row.stockStatus === "Out of Stock" && "text-[#FF392B]") || (row.stockStatus === "instock" && "text-[#279F51]")}`}
//           >
//             {row.stockStatus}
//           </h1>
//         </Box>
//       ),
//     },
//     {
//       name: "Actions",
//       cell: (row: productType) => (
//         <Box>
//           <TableOptions id={row.id} />
//         </Box>
//       ),
//     },
//   ];
//   const Data: productType[] = [
//     { id: 1, name: "Product 1", price: "$10", stockStatus: "In Stock" },
//     { id: 2, name: "Product 2", price: "$20", stockStatus: "Out of Stock" },
//     { id: 3, name: "Product 3", price: "$15", stockStatus: "In Stock" },
//     { id: 4, name: "Product 4", price: "$25", stockStatus: "In Stock" },
//   ];
//   const customStyles = {
//     // headCells: {
//     //   style: {
//     //     borderRight:'',
//     //     backgroundColor:'brown',
//     //     color:'white', // Add border to column headers
//     //   },
//     // },
//     // cells: {
//     //   style: {
//     //     borderRight:``, // Add border between columns in the body
//     //   },
//     // },
//   };
//   return (
//     <Box>
//       <Box className=" w-11/12 m-auto ">
//         <Box
//           border="1px"
//           borderColor="gray.300"
//           borderRadius="lg"
//           className="pt-[5px] pb-[20px] bg-white rounded-lg "
//         >
//           {/* <Box className=' w-11/12 m-auto flex items-center justify-between  mb-[20px]'>
//       <Text className=' text-[15px] font-semibold'>Latest Orders</Text>
//       <IconButton
//      icon={<Box className=' flex items-center gap-x-[5px] p-[10px]'>
//       <Text className=' text-[15px]'>More</Text>
//       <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M1.33203 5.99967H10.6654M10.6654 5.99967L5.9987 1.33301M10.6654 5.99967L5.9987 10.6663" stroke="#8E95A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>

//      </Box>}
//       />
//     </Box> */}
//           <Box>
//             <DataTable
//               columns={column}
//               data={Data}
//               highlightOnHover
//               customStyles={customStyles}
//               selectableRows
//             />
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default Products;

//  import imp from '../../Dashboard/OrderDetails/${}'

function Products({}) {
  const router = useRouter();
  const toast = useToast();
  const { data, error, isPending } = getProducts();
  console.log({ productData: data?.data?.data });

  console.log({ productError: error });
  const productArray: any[] = data?.data?.data || [];

  const instock = useMemo(() => {
    return productArray.filter((item: any) => item.status === "in_stock");
  }, [productArray]);
  const outOfStock = useMemo(() => {
    return productArray.filter((item: any) => item.status === "out_of_stock");
  }, [productArray]);
  console.log({ in_stock: instock });

  console.log({ outOfStock: outOfStock });

  const column: any = [
    {
      name: "Date",
      selector: (row: any) => (
        <Text className="text-[12px]">{row.created_at}</Text>
      ),
    },
    {
      name: "Product Name",
      selector: (row: any) => (
        <Box className=" flex items-center gap-x-[10px]">
          <Box>
            {row.image_url && (
              <Image src={row.image_url} alt="" height={20} width={20} />
            )}
          </Box>
          <Box>
            <Text className="text-[12px]">{row.name}</Text>
          </Box>
        </Box>
      ),
    },
    {
      name: "Ratings",
      selector: (row: any) => (
        <Text className="text-[12px]">{row.ratings_count}</Text>
      ),
    },
    {
      name: "Unit Price",
      selector: (row: any) => <Text className="text-[12px]">{row.price}</Text>,
    },
    {
      name: "Status",
      selector: (row: any) => (
        <Text
          className={`text-[12px] ${(row.status === "in_stock" && "text-green-400") || (row.status === "out_of_stock" && " text-red-600")}`}
        >
          {row.status}
        </Text>
      ),
    },
    {
      name: "Ratings",
      cell: (row: any) => {
        const [ispending, setIsPending] = useState(false);
        const useGenerateLink = async (id: string) => {
          try {
            setIsPending(true);

            const resp = await Api_Instance.get(
              `/ratings/link?productId=${id}`,
            );
            console.log({ shareResp: resp });
            const linkId = resp?.data?.data?.product_code; // adjust path if needed

            if (linkId) {
              await navigator?.clipboard.writeText(
                `https://admin.regalinheirs.com/Ratings?productCode=${linkId}`,
              );
              toast({
                title: "Link copied!",
                description: "The link has been copied to clipboard",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
              });
            }

            console.log("Response:", resp.data);
          } catch (error: any) {
            console.error(error);

            toast({
              title: "Error",
              description:
                error.response?.data?.message || "Failed to generate link",
              status: "error",
              duration: 4000,
              isClosable: true,
              position: "top-right",
            });
          } finally {
            setIsPending(false);
          }
        };
        return (
          <Box>
            <Button
              onClick={() => useGenerateLink(row?.id)}
              isLoading={ispending}
            >
              <Text className=" text-[10px]">Generate Link</Text>
            </Button>
          </Box>
        );
      },
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <Box>
          <TableOptions id={row.id} />
        </Box>
      ),
    },
  ];
  const Data = [
    {
      id: 1,
      name: "Kaftan joggers",
      assigned: "59",
      picked: "50",
      completed: "50",
      returned: "9",
      Status: "in-stock",
      date: "2/08/2050",
      client: "Jumia",
      price: "N90,00",
    },
    {
      id: 2,
      name: "Short Cargo",
      assigned: "59",
      picked: "50",
      completed: "50",
      returned: "9",
      Status: "in-stock",
      date: "2/08/2050",
      price: "N90,00",
      //client:'Jumia',
    },
    {
      id: 3,
      name: "Native singlet",
      assigned: "59",
      picked: "50",
      completed: "50",
      returned: "9",
      Status: "Paid",
      date: "in-stock",
      client: "Jumia",
      price: "N90,00",
    },
    {
      id: 4,
      name: "Cargo Top",
      assigned: "59",
      picked: "50",
      completed: "50",
      returned: "9",
      Status: "out-of-stock",
      date: "2/08/2050",
      client: "Jumia",
      price: "N90,00",
    },
    {
      id: 5,
      name: "Bullet-proof vest",
      assigned: "59",
      picked: "50",
      completed: "50",
      returned: "9",
      Status: "out-of-stock",
      date: "2/08/2050",
      price: "N90,00",
    },
  ];
  const customStyles = {
    headCells: {
      style: {
        borderRight: "",
        backgroundColor: " #BE1011",
        color: "white", // Add border to column headers
      },
    },
    // cells: {
    //   style: {
    //     borderRight:``, // Add border between columns in the body
    //   },
    // },
  };
  return (
    <Box>
      <Box className=" grid grid-cols-3  pl-[20px] pr-[20px] mb-[40px] mt-[20px] items-center gap-x-[40px]">
        <DashboardCard
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.13281 2.83594H3.79754C4.83082 2.83594 5.64404 3.7257 5.55793 4.74941L4.76384 14.2785C4.6299 15.838 5.86408 17.1774 7.43313 17.1774H17.6224C19.0001 17.1774 20.2056 16.0485 20.3108 14.6804L20.8275 7.50482C20.9423 5.91664 19.7368 4.62503 18.139 4.62503H5.78756"
                stroke="#031966"
                stroke-width="1.43511"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.7662 21.9719C16.4267 21.9719 16.9622 21.4365 16.9622 20.776C16.9622 20.1155 16.4267 19.5801 15.7662 19.5801C15.1057 19.5801 14.5703 20.1155 14.5703 20.776C14.5703 21.4365 15.1057 21.9719 15.7662 21.9719Z"
                stroke="#031966"
                stroke-width="1.43511"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.11389 21.9719C8.77438 21.9719 9.30981 21.4365 9.30981 20.776C9.30981 20.1155 8.77438 19.5801 8.11389 19.5801C7.4534 19.5801 6.91797 20.1155 6.91797 20.776C6.91797 21.4365 7.4534 21.9719 8.11389 21.9719Z"
                stroke="#031966"
                stroke-width="1.43511"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.83203 8.57812H20.3129"
                stroke="#031966"
                stroke-width="1.43511"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
          title={"Total Products"}
          Total_number={productArray?.length || ""}
          bgColor={""}
          textColor={""}
          partners={""}
          Add_Riders={""}
          routeFunc={() => {}}
        />
        <DashboardCard
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.13281 2.83594H3.79754C4.83082 2.83594 5.64404 3.7257 5.55793 4.74941L4.76384 14.2785C4.6299 15.838 5.86408 17.1774 7.43313 17.1774H17.6224C19.0001 17.1774 20.2056 16.0485 20.3108 14.6804L20.8275 7.50482C20.9423 5.91664 19.7368 4.62503 18.139 4.62503H5.78756"
                stroke="#031966"
                stroke-width="1.43511"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.7662 21.9719C16.4267 21.9719 16.9622 21.4365 16.9622 20.776C16.9622 20.1155 16.4267 19.5801 15.7662 19.5801C15.1057 19.5801 14.5703 20.1155 14.5703 20.776C14.5703 21.4365 15.1057 21.9719 15.7662 21.9719Z"
                stroke="#031966"
                stroke-width="1.43511"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.11389 21.9719C8.77438 21.9719 9.30981 21.4365 9.30981 20.776C9.30981 20.1155 8.77438 19.5801 8.11389 19.5801C7.4534 19.5801 6.91797 20.1155 6.91797 20.776C6.91797 21.4365 7.4534 21.9719 8.11389 21.9719Z"
                stroke="#031966"
                stroke-width="1.43511"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.83203 8.57812H20.3129"
                stroke="#031966"
                stroke-width="1.43511"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
          title={"In-stock"}
          Total_number={instock?.length || ""}
          bgColor={""}
          textColor={"green"}
          partners={""}
          Add_Riders={""}
          routeFunc={() => {}}
        />
        <DashboardCard
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.13281 2.83594H3.79754C4.83082 2.83594 5.64404 3.7257 5.55793 4.74941L4.76384 14.2785C4.6299 15.838 5.86408 17.1774 7.43313 17.1774H17.6224C19.0001 17.1774 20.2056 16.0485 20.3108 14.6804L20.8275 7.50482C20.9423 5.91664 19.7368 4.62503 18.139 4.62503H5.78756"
                stroke="#031966"
                stroke-width="1.43511"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.7662 21.9719C16.4267 21.9719 16.9622 21.4365 16.9622 20.776C16.9622 20.1155 16.4267 19.5801 15.7662 19.5801C15.1057 19.5801 14.5703 20.1155 14.5703 20.776C14.5703 21.4365 15.1057 21.9719 15.7662 21.9719Z"
                stroke="#031966"
                stroke-width="1.43511"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.11389 21.9719C8.77438 21.9719 9.30981 21.4365 9.30981 20.776C9.30981 20.1155 8.77438 19.5801 8.11389 19.5801C7.4534 19.5801 6.91797 20.1155 6.91797 20.776C6.91797 21.4365 7.4534 21.9719 8.11389 21.9719Z"
                stroke="#031966"
                stroke-width="1.43511"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.83203 8.57812H20.3129"
                stroke="#031966"
                stroke-width="1.43511"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
          title={"Out-of-stock"}
          Total_number={outOfStock?.length || "0"}
          bgColor={""}
          textColor={"red"}
          partners={""}
          Add_Riders={""}
          routeFunc={() => {}}
        />
      </Box>
      <Box className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 z-0 pl-[20px] pr-[20px] ">
        <Box
          border="1px"
          borderColor="#5b2a2e17"
          borderRadius="lg"
          className="pb-[20px] bg-white z-0 overflow-hidden"
        >
          {isPending ? (
            <Box className=" grid justify-center pt-[20px] pb-[20px]">
              <Text className=" text-center">Loading...</Text>
            </Box>
          ) : (
            <Box position="unset" className="overflow-x-auto z-0">
              <DataTable
                columns={column}
                data={productArray}
                highlightOnHover
                customStyles={customStyles}
                responsive
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Products;
