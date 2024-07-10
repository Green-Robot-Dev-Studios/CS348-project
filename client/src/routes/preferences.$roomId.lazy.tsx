import { Content } from "@/components/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/preferences/$roomId")({
  component: Preferences,
});

const preferences = ["halal", "vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free", "kosher", "pescatarian"];

export function Preferences() {
  const navigate = useNavigate();
  const { roomId } = Route.useParams();

  const selectedPrefs = new Map<string, boolean>(preferences.map((pref) => [pref, false]));

  const handleChange = (preference: string) => {
    selectedPrefs.set(preference, !selectedPrefs.get(preference));
  };

  const handleStart = () => {
    navigate({ to: `/swipe/${roomId}` });
  };

  return (
    <Content className="flex flex-row justify-center">
      <Card className="flex w-full max-w-lg flex-col">
        <CardHeader>Select your preferences!</CardHeader>
        <CardContent className="flex-grow">
          {preferences.map((preference) => (
            <div key={preference} className="ml-2 flex items-center space-x-2">
              <Checkbox id={preference} onChange={() => handleChange(preference)} />
              <label
                htmlFor={preference}
                className="m-1 text-lg peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {preference.charAt(0).toUpperCase() + preference.slice(1)}
              </label>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button onClick={handleStart} className="w-full">
            Start swiping!
          </Button>
        </CardFooter>
      </Card>
    </Content>
  );
}
