import { createLazyFileRoute } from "@tanstack/react-router";

/**
 * Redirect to the OAuth provider's login page for development.
 * In production, the Express router will hit the server-side route
 * and redirect before it can get to this client-side route.
 */

export const Route = createLazyFileRoute("/oauth/$provider")({
  component: Index,
});

function Index() {
  if (process.env.NODE_ENV === "production") {
    return null;
  }
  const url = new URL(window.location.href);
  url.port = "3030";
  window.location.href = url.toString();
  return null;
}
