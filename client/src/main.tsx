import { StrictMode } from "react";
import "../app/globals.css";
import "@fontsource-variable/playfair-display";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Provider as JotaiProvider } from "jotai";
import { Provider as FigbirdProvider } from "figbird";
import { ThemeProvider } from "./components/theme-provider";
import { User, createClient } from "waterfood";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/sonner";

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
              <RouterProvider router={router} />
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </FigbirdProvider>
      </JotaiProvider>
    </StrictMode>,
  );
}
