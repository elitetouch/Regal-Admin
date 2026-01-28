import Products from "@/app/(Pages)/ProductPages/page";
import * as Yup from "yup";
export const SignInFieldSchemma = Yup.object().shape({
  email: Yup.string()
    .trim()
    .lowercase()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Enter a valid email address",
    )
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
export const SignupSchemma = Yup.object().shape({
  email: Yup.string()
    .trim()
    .lowercase()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Enter a valid email address",
    )
    .required("Email is required"),
  name: Yup.string().required("Name is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
export const AddProductSchemma: any = Yup.object().shape({
  productName: Yup.string().required("Product name is required"),

  productPrice: Yup.number()
    .typeError("Product price must be a number")
    .positive("Product price must be greater than zero")
    .required("Product price is required"),

  ProductsImage: Yup.mixed<File>().required("Product image is required"),

  Productstatus: Yup.string().required("Product status is required"),
});
