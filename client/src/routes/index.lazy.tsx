import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import Spinner from "@/components/ui/spinner";
import useProtectRoute from "@/hooks/useProtectRoute";
import getLocation from "@/utils/getLocation";
import MapComponent from "@/Map/map-component";
import { Label } from "@radix-ui/react-label";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "figbird";
import { LocateIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createLazyFileRoute("/")({
  component: Dashboard,
});

const WATERLOO_COORDS = { latitude: 43.4723, longitude: -80.5449 };

export function Dashboard() {
  useProtectRoute();
  const navigate = useNavigate();

  const { create, status } = useMutation("rooms");

  const [latitude, setLatitude] = useState<number | string>(WATERLOO_COORDS.latitude);
  const [longitude, setLongitude] = useState<number | string>(WATERLOO_COORDS.longitude);
  const [maxDistance, setMaxDistance] = useState<number | string>(1000);
  const [searchNumber, setSearchNumber] = useState<number | string>(15);

  const [loadingLocation, setLoadingLocation] = useState(false);

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
    setLoadingLocation(true);
    try {
      const { latitude, longitude } = await getLocation();
      setLatitude(latitude);
      setLongitude(longitude);
    } catch (error) {
      toast.error("Error getting location", { description: (error as Error).message });
      console.error(error);
    }
    setLoadingLocation(false);
  };

  return (
    <form className="flex flex-grow flex-col gap-4" onSubmit={handleSubmit}>
      <Card className="ax-w-lg flex flex-grow flex-col sm:col-span-2" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle>Create a new room</CardTitle>
          <CardDescription className="prose text-balance leading-relaxed">
            <ol>
              <li>Pick your location</li>
              <li>Cap travel distance</li>
              <li>Limit the results</li>
              <li>Create the room</li>
              <li>Share its QR code!</li>
            </ol>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {/* <div className="grid gap-2">
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
          <Button
            variant="secondary"
            type="button"
            onClick={handleGetLocation}
            className="w-full"
            disabled={loadingLocation}
          >
            {loadingLocation ? <Spinner className="mr-2" /> : <LocateIcon className="mr-2 size-5" />}
            Get Current Location
          </Button> */}
              <div className="grid gap-2">
                <MapComponent lat={latitude} lng={longitude} zoom={14}>
                  <div>HI</div>
                  <div>HI</div>
                  <div>HI</div>
                </MapComponent>
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  className="h-10 w-64"
                  onValueChange={(val: number) => console.log(val)}
                />
              </div>

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
            <Label>Limit Results</Label>
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
            {status === "loading" ? <Spinner className="mr-2" /> : <PlusIcon className="mr-2 size-5" />} Create
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
