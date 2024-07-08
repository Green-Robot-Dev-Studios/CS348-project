import { Content } from "@/components/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import getUserOrRedirectLogin from "@/hooks/getUserOrRedirectLogin";
import { Label } from "@radix-ui/react-label";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "figbird";
import { useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: Dashboard,
});

export function Dashboard() {
  getUserOrRedirectLogin();
  const navigate = useNavigate();

  const { create } = useMutation("rooms");

  const [latitude, setLatitude] = useState<number | string>(43.4723);
  const [longitude, setLongitude] = useState<number | string>(-80.5449);
  const [maxDistance, setMaxDistance] = useState<number | string>(5000);
  const [searchNumber, setSearchNumber] = useState<number | string>(6);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await create({
        latitude: Number(latitude),
        longitude: Number(longitude),
        maxDistance: Number(maxDistance),
        searchNumber: Number(searchNumber),
      });
      console.log(response);

      await navigate({ to: `/room/${response.id}` });
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetLocation = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  };

  return (
    <Content>
      <h1 className="text-center font-display text-8xl font-semibold">Waterfood</h1>
      <div className="px-4 pt-6">
        <form className="grid gap-4 p-4" onSubmit={handleSubmit}>
          <Card className="mt-6 sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>Create a new room</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
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
              <Button variant="secondary" type="button" onClick={handleGetLocation}>
                Get Current Location
              </Button>
              <div className="grid gap-2">
                <Label>Max Distance</Label>
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
              <Button type="submit">Create</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </Content>
  );
}
