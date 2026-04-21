import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-sans bg-background text-foreground" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(28, 25, 23, 0.02) 1px, transparent 0)', backgroundSize: '20px 20px' }}>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  );
}
