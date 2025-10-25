'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Bell } from 'lucide-react';
import { UserNav } from './user-nav';
import { usePathname } from 'next/navigation';
import {
  SidebarTrigger,
} from "@/components/ui/sidebar";

const getTitleFromPathname = (pathname: string) => {
  const segment = pathname.split('/').pop() || 'chat';
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

export function AppHeader() {
  const pathname = usePathname();
  const title = getTitleFromPathname(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4 md:px-6">
       <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex-1">
        <h1 className="font-semibold text-lg">{title}</h1>
      </div>
      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="relative hidden w-full max-w-sm md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8" />
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <UserNav />
      </div>
    </header>
  );
}
