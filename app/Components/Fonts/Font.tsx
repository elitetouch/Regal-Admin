import { Rufina, Roboto_Slab, Roboto_Serif } from "next/font/google";

export const rufina = Rufina({
  subsets: ["latin"],
  weight: ["400", "700"], // Rufina supports 400 & 700
});

export const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
