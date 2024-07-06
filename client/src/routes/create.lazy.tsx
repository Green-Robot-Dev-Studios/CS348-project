import AppMenu from "@/components/app-menu";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "figbird";

export const Route = createLazyFileRoute("/create")({
  component: Create,
});

export function Create() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error } = useMutation("rooms");

  // Currently 401 unauthorized. TODO: auth
  // create({ longitude: 0, latitude: 0, maxDistance: 5, searchNumber: 6 });

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppMenu />
      <div className="pl-14">
        {JSON.stringify(data)}
        {JSON.stringify(error)}
      </div>
    </div>
  );
}
