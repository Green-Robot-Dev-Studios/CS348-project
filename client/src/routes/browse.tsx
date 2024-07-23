import FoodCard from "@/components/food-card";
import BrowsePagination from "@/components/ui/browse-pagination";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useFind } from "figbird";

export const Route = createFileRoute("/browse")({
  component: Browse,
  validateSearch: (search: BrowseSearch) => ({
    page: search.page ? Number(search.page) : 1,
  }),
});

type BrowseSearch = {
  page?: number;
};

export function Browse() {
  const { page } = useSearch({ from: "/browse" });
  const {
    data: food,
    total,
    limit,
  } = useFind("food", {
    query: {
      $limit: 10,
      $skip: (page - 1) * 10,
    },
  });
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex w-full flex-col gap-2">
      <BrowsePagination page={page} totalPages={totalPages} />

      {(food ?? []).map((f) => (
        <FoodCard key={f.id} food={f} />
      ))}
    </div>
  );
}
