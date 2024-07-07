import AppMenu from "@/components/app-menu";

import { ReactNode } from 'react';

export function Content({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppMenu />
      <div className="sm:ml-14">
        {children}
      </div>
    </div>
  );
}
