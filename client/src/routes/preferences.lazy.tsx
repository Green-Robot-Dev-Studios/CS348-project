import AppMenu from "@/components/app-menu";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/preferences")({
  component: Preferences,
});

const preferences = ["halal", "vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free", "kosher", "pescatarian"];

export function Preferences() {
  const selectedPrefs = new Map<string, boolean>(preferences.map((pref) => [pref, false]));

  const handleChange = (preference: string) => {
    selectedPrefs.set(preference, !selectedPrefs.get(preference));
    console.log(selectedPrefs);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppMenu />
      <div className="mt-10 h-96">
        <div className="mx-10">
          {preferences.map((preference: string) => (
            <Toggle className="mx-1 my-1 text-lg" value={preference} onClick={() => handleChange(preference)}>
              {preference.charAt(0).toUpperCase() + preference.slice(1)}
            </Toggle>
          ))}
        </div>
      </div>
    </div>
  );
}
