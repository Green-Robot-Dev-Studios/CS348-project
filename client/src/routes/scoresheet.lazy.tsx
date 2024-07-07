import AppMenu from "@/components/app-menu";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/scoresheet")({
  component: ScoreSheet,
});

const testObj = {
  quickDraw: "",
};

export function ScoreSheet() {
  // const { provider } = Route.useParams();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppMenu />
      <div className="pl-14">
        <Card className="mx-auto max-w-sm">
          <CardTitle>New Title</CardTitle>
        </Card>
      </div>
    </div>
  );
}
