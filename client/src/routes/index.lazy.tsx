import AppMenu from "@/components/app-menu";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Dashboard,
});

export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppMenu />
      <div className="pl-14">
        <h1 className="text-center font-display text-8xl font-semibold">Waterfood</h1>
        <div className="px-4 pt-6">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Let's get started.</h1>
          <Card className="mt-6 sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>Create a new room</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Get a scannable QR code to share with your guests. They can use it to join your room!
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link to="/create" className="text-primary">
                <Button>Create</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card className="mt-6 sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>Join a room</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Cameras out, scan the QR code and join the room.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link to="/join" className="text-primary">
                <Button>Join</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
