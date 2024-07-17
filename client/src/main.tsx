import "@fontsource-variable/playfair-display";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Provider as FigbirdProvider } from "figbird";
import { Provider as JotaiProvider } from "jotai";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { User, createClient } from "waterfood";
import "../app/globals.css";
import { ThemeProvider } from "./components/theme-provider";

// Import the generated route tree
import AuthProvider from "./auth/authProvider";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const client = createClient();
export let user: User | null = null;

client.reAuthenticate().catch(() => {});

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <JotaiProvider>
        <FigbirdProvider feathers={client}>
          <ThemeProvider>
            <TooltipProvider>
              <AuthProvider>
                <RouterProvider router={router} />
                <Toaster />
              </AuthProvider>
            </TooltipProvider>
          </ThemeProvider>
        </FigbirdProvider>
      </JotaiProvider>
    </StrictMode>,
  );
}
