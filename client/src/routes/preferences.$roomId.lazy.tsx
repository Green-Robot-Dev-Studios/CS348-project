import { Content } from "@/components/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
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
    console.log(selectedPrefs);
  };

  const handleStart = () => {
    navigate({ to: `/swipe/${roomId}` });
  };

  return (
    <Content>
      <div className="mt-10 h-96">
        <div className="mx-10">
          <Card>
            <CardHeader>Select your preferences!</CardHeader>
            <CardContent>
              {preferences.map((preference: string) => (
                <div key={preference}>
                  <Toggle className="mx-1 my-1 text-lg" value={preference} onClick={() => handleChange(preference)}>
                    {preference.charAt(0).toUpperCase() + preference.slice(1)}
                  </Toggle>
                  <br />
                </div>
              ))}
            </CardContent>
            <Button onClick={handleStart} className="m-6 mt-0">
              Start swiping!
            </Button>
          </Card>
        </div>
      </div>
    </Content>
  );
}
