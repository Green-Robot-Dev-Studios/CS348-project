import { Content } from "@/components/content";
import SwipeScreen, { CardData } from "@/components/swipe-screen";
import getUserOrRedirectLogin from "@/hooks/getUserOrRedirectLogin";
import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useFind, useGet, useMutation } from "figbird";

export const Route = createLazyFileRoute("/swipe/$roomId")({
  component: Swipe,
});

export function Swipe() {
  const { roomId } = Route.useParams();
  const user = getUserOrRedirectLogin();

  const { data: room } = useGet("rooms", roomId);
  const { data: closeFoods } = useFind("close-food", { query: { roomId } });
  const { create: vote } = useMutation("votes");

  const handleSwipe = async (foodId: string, action: "left" | "right") => {
    vote({ foodId, roomId, approved: action === "right", userId: user?.id});
  };

  const parsedData = (closeFoods ?? []).map(
    (item): CardData => ({
      displayName: item.displayName,
      editorialSummary: item.editorialSummary,
      formattedAddress: item.formattedAddress,
      id: item.id,
      photoLink: item.photoLink,
      websiteURL: item.websiteURL,
    }),
  );

  if (room?.picked) return <Navigate to={`/scoresheet/${roomId}`} />;

  return (
    <Content>
      {parsedData.length > 0 ? (
        <SwipeScreen data={parsedData} onSwipe={handleSwipe} />
      ) : (
        <div className="relative flex h-screen w-full items-center justify-center overflow-clip">
          <h2 className="absolute z-10 text-center text-2xl">Loading!</h2>
        </div>
      )}
    </Content>
  );
}
