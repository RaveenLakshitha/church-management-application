import {headers} from "next/headers";
import {auth} from "@/lib/auth"; 
import { redirect } from "next/navigation";
import {SignUpForm} from "@/modules/auth/ui/views/sign-up-form"

const Page = async ()  => {
  const session = await auth.api.getSession({
    headers:await headers(),
  });

  if(!!session){
    redirect("/dashboard")
  }

  return <SignUpForm/>
};

export default Page;