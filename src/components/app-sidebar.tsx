"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  MessageSquare,
  Wand2,
  FolderOpen,

  Settings,
} from "lucide-react";

const navigationItems = [
  {
    title: "Home",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "AI Chat",
    url: "/chat",
    icon: MessageSquare,
  },
  {
    title: "Offer Builder",
    url: "/builder",
    icon: Wand2,
  },
  {
    title: "My Offers",
    url: "/offers",
    icon: FolderOpen,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="border-b border-sidebar-border/50 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <div className="h-4 w-4 rounded-full bg-sidebar-primary-foreground" />
          </div>
          <h1 className="font-display text-xl font-semibold text-sidebar-foreground">
            Gravity
          </h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.url || 
                  (item.url !== "/" && pathname.startsWith(item.url));
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`
                        group relative h-10 w-full justify-start gap-3 rounded-lg px-3 py-2 
                        text-sm font-medium transition-all duration-200
                        hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
                        ${isActive 
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm' 
                          : 'text-sidebar-foreground/80'
                        }
                      `}
                    >
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span className="truncate">{item.title}</span>
                        {isActive && (
                          <div className="absolute right-2 h-1.5 w-1.5 rounded-full bg-sidebar-primary-foreground" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border/50 p-4">
        <div className="text-xs text-sidebar-foreground/50 text-center">
          Premium Offer Builder
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}