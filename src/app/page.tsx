import { getSessionUser,isAdmin } from "@/lib/auth0";
import { redirect } from "next/navigation";


export default async function RootPage(){
  const user = await getSessionUser();
  if(user && isAdmin(user)){
   redirect("/admin");
  }

  redirect("/home");

}