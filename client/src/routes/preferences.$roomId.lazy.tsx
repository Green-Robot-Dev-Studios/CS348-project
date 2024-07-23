import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import useMap from "@/hooks/useMap";
import useProtectRoute from "@/hooks/useProtectRoute";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/preferences/$roomId")({
  component: Preferences,
});

const preferences = ["halal", "vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free", "kosher", "pescatarian"];

export function Preferences() {
  useProtectRoute();
  const navigate = useNavigate();
  const { roomId } = Route.useParams();

  const selectedPrefs = useMap(preferences.map((pref) => [pref, false]));

  const noneSelected = Array.from(selectedPrefs.values()).every((value) => !value);

  const handleChange = (preference: string, checked: string | boolean) => {
    selectedPrefs.set(preference, checked);
  };

  const handleStart = () => {
    navigate({ to: `/swipe/${roomId}` });
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Select your preferences!</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {preferences.map((preference) => (
          <div key={preference} className="ml-2 flex items-center space-x-4">
            <Checkbox id={preference} onCheckedChange={(checked) => handleChange(preference, checked)} />
            <label
              htmlFor={preference}
              className="my-1 select-none text-xl peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {preference.charAt(0).toUpperCase() + preference.slice(1)}
            </label>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={handleStart} className="w-full">
          {noneSelected ? "No preference, start swiping!": "Start swiping!"}
        </Button>
      </CardFooter>
    </Card>
  );
}
