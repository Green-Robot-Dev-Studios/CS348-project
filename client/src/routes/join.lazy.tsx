import AppMenu from "@/components/app-menu";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useFind } from "figbird";

export const Route = createLazyFileRoute("/join")({
  component: Join,
});

export function Join() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error } = useFind("rooms", { allPages: true });

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppMenu />
      <div className="pl-14">
        {JSON.stringify(data)} {JSON.stringify(error)}
      </div>
    </div>
  );
}
