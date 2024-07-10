import { Content } from "@/components/content";
import FoodCard from "@/components/food-card";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useFind } from "figbird";

export const Route = createLazyFileRoute("/browse")({
  component: Browse,
});

export function Browse() {
  const { data: food } = useFind("food");

  return (
    <Content>
      <h4 className="text-xl pb-2">Hello world output on our restaurant dataset:</h4>
      <div className="flex flex-col gap-2">
        {(food ?? []).map((f) => (
          <FoodCard key={f.id} food={f} />
        ))}
      </div>
    </Content>
  );
}
