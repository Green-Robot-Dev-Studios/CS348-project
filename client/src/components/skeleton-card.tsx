import { Skeleton } from "./ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="justify-middle my-10 flex flex-col items-center space-y-3">
      <Skeleton className="h-20 w-40 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  );
}
