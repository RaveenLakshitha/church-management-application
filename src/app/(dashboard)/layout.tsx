import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle";


interface Props {
    children: React.ReactNode;
}

const Layout = ({children} : Props) => {
    return(
    <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <ModeToggle/>
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
        </header>
        <main className="flex flex-col h-screen w-screen bg-muted">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>);
}

export default Layout;