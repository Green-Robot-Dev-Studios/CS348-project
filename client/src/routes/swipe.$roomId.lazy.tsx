import useAuth from "@/auth/useAuth";
import SwipeScreen from "@/components/swipe-screen";
import useProtectRoute from "@/hooks/useProtectRoute";
import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useFind, useGet, useMutation } from "figbird";

export const Route = createLazyFileRoute("/swipe/$roomId")({
  component: Swipe,
});

export function Swipe() {
  useProtectRoute();
  const { roomId } = Route.useParams();

  const { user } = useAuth();

  const { data: room } = useGet("rooms", roomId);
  const { data: closeFoods } = useFind("close-food", { query: { roomId } });
  const { create: vote } = useMutation("votes");

  const handleSwipe = async (foodId: string, action: "left" | "right") => {
    vote({ foodId, roomId, approved: action === "right", userId: user?.id });
  };

  if (room?.picked) return <Navigate to={`/results/${roomId}`} />;

  if (closeFoods) return <SwipeScreen closeFoods={closeFoods} onSwipe={handleSwipe} />;

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-clip">
      <h2 className="absolute z-10 text-center text-2xl">Loading!</h2>
    </div>
  );
}
