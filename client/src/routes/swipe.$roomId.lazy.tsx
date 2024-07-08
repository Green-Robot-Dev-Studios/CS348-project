import { Content } from "@/components/content";
import SwipeScreen, { CardData } from "@/components/swipe-screen";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useFeathers, useFind } from "figbird";
import { useEffect, useState } from "react";

export const Route = createLazyFileRoute("/swipe/$roomId")({
  component: Swipe,
});

export function Swipe() {
  const { roomId } = Route.useParams();
  const navigate = useNavigate()

  const feathers = useFeathers();
  const [data, setData] = useState({});
  useEffect(() => {
    (async () => {
      setData(await feathers.service("close-food").find({ query: { roomId } }));
    })();
  });

  const roomStatus = useFind("rooms", { query: { id: roomId } });
  if (roomStatus.data && roomStatus.data[0].picked) {
    navigate({ to: `/scoresheet/${roomId}` });
  }
  console.log("ROOM STATUS", roomStatus.data && roomStatus.data[0].picked)

  const handleSwipe = async (foodId: string, action: "left" | "right") => {
    // TODO: mutate votes to add the vote
    console.log(foodId, action);
    return null;
  };

  const parsedData = Array.isArray(data)
    ? data.map(
        (item): CardData => ({
          displayName: item.displayName,
          editorialSummary: item.editorialSummary,
          formattedAddress: item.formattedAddress,
          id: item.id,
          photoLink: item.photoLink,
          websiteURL: item.websiteURL,
        }),
      )
    : [];
  console.log(parsedData);

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
