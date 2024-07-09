import AppMenu from "@/components/app-menu";
import { cn } from "@/lib/utils";

import { ReactNode } from "react";

export function Content({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex min-h-screen w-full flex-row bg-muted/40")}>
      <AppMenu />
      <div className={cn("flex flex-grow flex-col", className)}>{children}</div>
    </div>
  );
}
