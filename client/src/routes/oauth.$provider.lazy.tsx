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
  const { provider } = Route.useParams();
  window.location.href = `http://localhost:3030/oauth/${provider}`;
  return null;
}
