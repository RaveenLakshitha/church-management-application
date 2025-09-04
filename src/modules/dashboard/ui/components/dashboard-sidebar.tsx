"use client"

import { ChevronRight, StarIcon } from "lucide-react"
import PeopleIcon from '@mui/icons-material/People';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {cn} from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import Logo from "../../../../assets/logo3.png"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { NavUser } from "@/components/nav-user"
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
}

const firstSection = [
  {
    icon: PeopleIcon,
    label: "Members", // Changed 'lable' to 'label' for consistency
    href: "/members",
    items: [
      // Example sub-items for collapsible
      { title: "All Members", url: "/members/all" },
      { title: "Active Members", url: "/members/active" },
    ],
  },
  {
    icon: VolunteerActivismIcon,
    label: "Donations", // Changed 'lable' to 'label' for consistency
    href: "/donations",
    items: [
      // Example sub-items for collapsible
      { title: "Donations List", url: "/donations/all" },
    ],
  },
]

export const DashboardSidebar = () => {
    const pathName = usePathname();
    const {data, isPending} = authClient.useSession();

    if(isPending || !data?.user){
      return null;
    }
    
    return (
        <Sidebar collapsible="icon">
        <SidebarHeader className="text-sidebar-accent-foreground">
            <div>
                <Link href={"/"} className="flex items-center gap-2 px-2 pt-2">
                <Image src={Logo} height={36} width={36} alt="church.logo" />
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-bold text-lg">Church App</span>
                    </div>
                </Link>
            </div>
        </SidebarHeader>
        <div className="px-4 py-2">
            <Separator className="opacity-10 text-[#5D6B68]" />
        </div>
        <SidebarContent>
            <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                {firstSection.map((item) => (
                    <Collapsible
                    key={item.href}
                    asChild
                    defaultOpen={false}
                    className="group/collapsible"
                    >
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                        <SidebarMenuButton className={cn("h-10 hover:linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50", pathName === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10"  )} tooltip={item.label} isActive={pathName === item.href}>
                            <item.icon />
                            <span className="text-sm font-medium tracking-tight">
                            {item.label}
                            </span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                        <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.url}>
                                <SidebarMenuSubButton asChild>
                                <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                    </Collapsible>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <NavUser user={data.user} />
        </SidebarFooter>
        </Sidebar>
    )
}