import SwipeCard from "@/components/ui/swipe-card";
import { useFind } from "figbird";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CloseFood } from "waterfood";
import DisplayUser from "./display-user";

interface SwipeScreenProps {
  roomId: string;
  closeFoods: CloseFood[];
  onSwipe: (id: string, action: "left" | "right") => Promise<void>;
}

export default function SwipeScreen({ roomId, closeFoods, onSwipe }: SwipeScreenProps) {
  const [cards, setCards] = useState(closeFoods);

  const { data: votes } = useFind("votes", { query: { roomId } });
  const { data: connections } = useFind("connections", { query: { roomId } });
  const unfinishedConnections = (connections ?? []).filter((con) => {
    // con.user has not voted for all their cards
    const userVotes = (votes ?? []).filter((vote) => vote.userId === con.userId).length;
    // console.log(`User ${con.user.name} has ${userVotes}/${closeFoods.length} votes`);
    return userVotes < closeFoods.length;
  });

  const activeIndex = cards.length > 0 ? cards[cards.length - 1].id : 0;
  const removeCard = (id: string, action: "left" | "right") => {
    setCards((prev) => prev.filter((card) => card.id !== id));
    onSwipe(id, action);
  };


  return (
    <div className="relative flex w-full flex-grow items-center justify-center overflow-clip">
      <AnimatePresence>
        {cards.length ? (
          cards.map((card) => (
            <SwipeCard key={card.id} data={card} active={card.id === activeIndex} removeCard={removeCard} />
          ))
        ) : (
          <div className="flex flex-col">
            <h2 className="z-10 text-center text-2xl mb-4">Still waiting for these people to finish...</h2>
            <ul className="z-10 flex flex-col gap-2">
              {(unfinishedConnections ?? []).map((con) => (
                <li key={con.id}>
                  <DisplayUser user={con.user} className="justify-start"/>
                </li>
              ))}
            </ul>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
