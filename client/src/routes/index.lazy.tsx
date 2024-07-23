import MapComponent from "@/components/map/map-component";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import Spinner from "@/components/ui/spinner";
import useProtectRoute from "@/hooks/useProtectRoute";
import getLocation from "@/utils/getLocation";
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
  const [maxDistance, setMaxDistance] = useState<number>(500);
  const [searchNumber, setSearchNumber] = useState<number>(15);

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
        </CardHeader>
        <CardContent className="flex flex-grow flex-col gap-4">
          <MapComponent
            lat={Number(latitude)}
            setLat={setLatitude}
            lng={Number(longitude)}
            setLng={setLongitude}
            maxDistance={Number(maxDistance)}
          />
          <Button
            variant="secondary"
            type="button"
            onClick={handleGetLocation}
            className="w-full"
            disabled={loadingLocation}
          >
            {loadingLocation ? <Spinner className="mr-2" /> : <LocateIcon className="mr-2 size-5" />}
            Get Current Location
          </Button>

          <div className="grid gap-2">
            <Label htmlFor="maxDistance">Max Distance: {maxDistance} m</Label>
            <Slider
              value={[maxDistance]}
              min={50}
              max={2000}
              className="w-full"
              onValueChange={([val]) => setMaxDistance(val)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="searchNumber">Pick top {searchNumber}</Label>
            <Slider
              id="searchNumber"
              min={5}
              max={30}
              value={[searchNumber]}
              onValueChange={([val]) => setSearchNumber(val)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            {status === "loading" ? <Spinner className="mr-2" /> : <PlusIcon className="mr-2 size-5" />} Create Room
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
