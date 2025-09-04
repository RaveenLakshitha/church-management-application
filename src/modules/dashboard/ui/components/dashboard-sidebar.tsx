"use client"

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
      SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import {StarIcon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../assets/logo3.png";
import { Separator } from "@radix-ui/react-dropdown-menu";

const firstSection = [
    {
        icon: <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      </svg>,
        lable: "Members",
        href:"/members",
    }
];

const secondSection = [
    {
        icon: StarIcon,
        lable: "Upgrade",
        href:"/upgrade",
    },
];

export const DashboardSidebar = () => {
    return(
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href={"/"} className="flex items-center gap-2 px-2 pt-2">
                    <Image src={Logo} height={36} width={36} alt="church.logo"/>
                    <p className="text-2xl font-semibold">Church App</p>
                </Link>
            </SidebarHeader>
            <div className="px-4 py-2">
                <Separator className="opacity-10 text-[#5D6B68]"></Separator>
            </div>  
        </Sidebar>
    )
}