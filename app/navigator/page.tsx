import { redirect } from "next/navigation";

/** Legacy landing URL — main site is now `/`. */
export default function NavigatorIndexRedirect() {
  redirect("/");
}
