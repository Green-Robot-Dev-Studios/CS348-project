import Navbar from "@/components/navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () =>
    location.pathname.startsWith("/swipe") ? (
      <div className="flex h-dvh w-full flex-col bg-muted/40">
        <Navbar />
        <Outlet />
      </div>
    ) : (
      <div className="flex min-h-dvh w-full flex-col items-center bg-muted/40">
        <Navbar />
        <div className="flex w-full max-w-lg flex-grow flex-col p-6">
          <Outlet />
        </div>
      </div>
    ),
});
