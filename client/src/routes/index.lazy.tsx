import AppMenu from "@/components/app-menu";
import FoodCard from "@/components/food-card";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useFind } from "figbird";

export const Route = createLazyFileRoute("/")({
  component: Dashboard,
});

export function Dashboard() {
  const { data: food } = useFind("food", { allPages: true });

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppMenu />
      <h1 className="text-center font-display text-8xl font-semibold">Waterfood</h1>
      <h4 className="text-center text-xl">Hello world output on our restaurant dataset:</h4>
      <div className="ml-16 mr-2 mt-2 flex flex-col gap-2">
        {(food ?? []).map((f) => (
          <FoodCard key={f.id} food={f} />
        ))}
      </div>
    </div>
  );
}
