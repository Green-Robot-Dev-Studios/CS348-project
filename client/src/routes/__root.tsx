import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () =>
    location.pathname.startsWith("/swipe") ? (
      <div className="flex flex-col bg-muted/40">
        <Navbar />
        <div className="flex flex-col flex-grow">
          <Outlet />
        </div>
      </div>
    ) : (
      <div className={cn("flex min-h-screen w-full flex-col items-center bg-muted/40")}>
        <Navbar />
        <div className="flex min-w-full max-w-xl flex-grow flex-col p-6 md:min-w-64">
          <Outlet />
        </div>
      </div>
    ),
});
