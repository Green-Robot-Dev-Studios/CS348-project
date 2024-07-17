import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useProtectRoute from "@/hooks/useProtectRoute";
import { Label } from "@radix-ui/react-label";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "figbird";
import { LocateIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createLazyFileRoute("/")({
  component: Dashboard,
});

const WATERLOO_COORDS = { latitude: 43.4723, longitude: -80.5449 };

export function Dashboard() {
  useProtectRoute();
  const navigate = useNavigate();

  const { create } = useMutation("rooms");

  const [latitude, setLatitude] = useState<number | string>(WATERLOO_COORDS.latitude);
  const [longitude, setLongitude] = useState<number | string>(WATERLOO_COORDS.longitude);
  const [maxDistance, setMaxDistance] = useState<number | string>(1000);
  const [searchNumber, setSearchNumber] = useState<number | string>(15);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await create({
        latitude: Number(latitude),
        longitude: Number(longitude),
        maxDistance: Number(maxDistance),
        searchNumber: Number(searchNumber),
      });

      await navigate({ to: `/room/${response.id}` });
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error(error);
        toast("Error getting location");
      },
    );
  };

  return (
    <form className="flex justify-center gap-4" onSubmit={handleSubmit}>
      <Card className="ax-w-lg sm:col-span-2" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle>Create a new room</CardTitle>
          <CardDescription className="text-balance leading-relaxed">
            Get a scannable QR code to share with your guests. They can use it to join your room!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Label>Latitude</Label>
            <Input
              id="latitude"
              type="number"
              value={latitude ?? undefined}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>
          <div className="grid gap-2 pb-2">
            <Label>Longitude</Label>
            <Input
              id="longitude"
              type="number"
              value={longitude ?? undefined}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>
          <Button variant="secondary" type="button" onClick={handleGetLocation} className="w-full">
            <LocateIcon className="mr-2 size-5" />
            Get Current Location
          </Button>
          <hr className="my-4" />
          <div className="grid gap-2">
            <Label>Max Distance (m)</Label>
            <Input
              id="maxDistance"
              type="number"
              value={maxDistance}
              onChange={(e) => setMaxDistance(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Search Number</Label>
            <Input
              id="searchNumber"
              type="number"
              value={searchNumber}
              onChange={(e) => setSearchNumber(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Create
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
