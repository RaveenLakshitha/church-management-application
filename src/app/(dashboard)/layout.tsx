import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
import { DashboardNavbar } from "@/components/dashboard-navbar";
import { ChurchSetupForm } from "@/modules/church/ui/components/church-setup-form";

interface Props {
    children: React.ReactNode;
}

const Layout = ({children} : Props) => {
  //   var t = true;
  //   if (t) {
  //   return <ChurchSetupForm />;
  // }

    return(
    <SidebarProvider>
        <DashboardSidebar />
        <main className="flex flex-col h-screen w-screen bg-muted">
          <DashboardNavbar/>
            {children}
        </main>
    </SidebarProvider>);
}

export default Layout;