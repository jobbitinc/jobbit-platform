import { redirect } from "next/navigation";
import { APP_HOME_PATH } from "@/lib/site";

/** Legacy landing URL — the app landing now lives at `/jobbit`. */
export default function NavigatorIndexRedirect() {
  redirect(APP_HOME_PATH);
}
