import { cn } from "@/lib/utils";

import { ReactNode } from "react";
import Navbar from "./navbar";

export function Content({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex min-h-screen w-full flex-col bg-muted/40")}>
      <Navbar />
      <div className={cn("flex flex-grow flex-col p-6", className)}>{children}</div>
    </div>
  );
}
