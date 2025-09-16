// app/(dashboard)/layout.tsx
import { cookies } from 'next/headers';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/modules/dashboard/ui/components/dashboard-sidebar';
import { DashboardNavbar } from '@/components/dashboard-navbar';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { ChurchSetupForm } from '@/modules/setup/ui/components/setup-form';
import { getCurrentUser } from '@/lib/session';

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  // Get current user
  // const user = await getCurrentUser();

  // if (!user) {
  //   redirect('/login');
  //   return null;
  // }

  // // Check setup status
  // const userProfile = await prisma.user.findUnique({
  //   where: { email: user.email },
  //   include: { church: true },
  // });

  // // Show setup form if no church is linked
  // if (!userProfile?.church) {
  //   return (
  //     <div className="min-h-screen bg-muted">
  //       <ChurchSetupForm />
  //     </div>
  //   );
  // }

  // Show dashboard with sidebar
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <DashboardSidebar />
      <div className="flex flex-col w-screen h-screen bg-muted">
        <DashboardNavbar />
        <main className="flex-1 overflow-y-auto bg-muted p-4">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}