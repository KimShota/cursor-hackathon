'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  Bot,
  Calendar,
  HeartPulse,
  LayoutDashboard,
  Settings,
  Users,
  UtensilsCrossed,
  LifeBuoy,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { AppHeader } from '@/components/app/app-header';
import { useAuth } from '@/lib/auth';
import { useEffect } from 'react';

const navItems = [
  { href: '/chat', label: 'Chat', icon: Bot },
  { href: '/calendar', label: 'Calendar', icon: Calendar },
  { href: '/friends', label: 'Friends', icon: Users },
  { href: '/dining', label: 'Dining', icon: UtensilsCrossed },
  { href: '/profile', label: 'Profile', icon: HeartPulse },
];

const bottomNavItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/demo-setup', label: 'Demo Setup', icon: LayoutDashboard },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }
  
  const isDemoMode = process.env.NEXT_PUBLIC_ENABLE_3H_HACKATHON_MOCK_DATA === 'true';

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
              <HeartPulse className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold">HealthPal AI</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  href={item.href}
                  isActive={pathname.startsWith(item.href)}
                  asChild
                >
                  <a href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            {bottomNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  href={item.href}
                  isActive={pathname.startsWith(item.href)}
                  asChild
                >
                  <a href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        {isDemoMode && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 mt-2">
            <div className="rounded-full bg-yellow-400/20 px-4 py-1 text-xs font-semibold text-yellow-700 dark:text-yellow-300">
              Demo Mode — Using Mock Data
            </div>
          </div>
        )}
        <AppHeader />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
