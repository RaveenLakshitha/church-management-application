import {headers} from "next/headers";
import {auth} from "@/lib/auth"; 
import { redirect } from "next/navigation";
import {SignInForm} from "@/modules/auth/ui/views/sign-in-form"

const Page = async ()  => {
  const session = await auth.api.getSession({
    headers:await headers(),
  });

  if(!!session){
    redirect("/")
  }

  return <SignInForm/>
};

export default Page;