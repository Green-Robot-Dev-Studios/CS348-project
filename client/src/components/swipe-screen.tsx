import { AnimatePresence } from 'framer-motion';
import SwipeCard from '@/components/ui/swipe-card';
import { useState } from 'react';

export type CardData = {
  id: string;
  displayName: string;
  photoLink: string;
  formattedAddress: string;
  editorialSummary: string;
  websiteURL: string;
};

// const foodData = [
//     {
//         id: "0",
//         displayName: "Ken Sushi",
//         photoLink: "https://places.googleapis.com/v1/places/ChIJ-wWzPQf0K4gRtf3wusBBydE/photos/AUc7tXX3HRFSKRSPR7SoSENxdsFinVXI5hSshEf9SeWSdR1NAy0dZWfUjAmcsqNwO5IvQOZjIMZILhGUgiB3ymoztSu8bNppHGKTTmLnwYIrCT48gf6Rleh5R_H9A39CE8Drc4KPaTOl5misBL0uj8hG3kPcD6DEruUcnkVV/media?maxWidthPx=4032&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg",
//         formattedAddress: "Blair House, 256 Phillip St, Waterloo, ON N2L 6B6, Canada",
//         editorialSummary: "Cool spot for sushi, sashimi & specialty rolls, along with cooked Japanese fare.",
//         websiteURL: "https://www.kensushihouse.ca/",
//     },
//     {
//         id: "1",
//         displayName: "Mel's Diner",
//         photoLink: "https://places.googleapis.com/v1/places/ChIJe-KLAAf0K4gRswXZzquz6Gs/photos/AUc7tXXqwiDP4IVpju1uzd87mj7SbQPrF85A5BJRF6unDxqHWik-GoZY8rfExz6nhYg_2_UpJxwNbjYcjOYsAEVuaqOcyo23n8GtV_gkc0KVy9Eh69dRiTW1T4f2KfdrHhi-LCJGroMttrbfNfCTcDgHGU4JwlHN58XS1P_L/media?maxWidthPx=3784&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg",
//         formattedAddress: "140 University Ave W, Waterloo, ON N2L 6J3, Canada",
//         editorialSummary: "All-day breakfast, hand-pressed burgers & blue-plate specials in a retro diner setting.",
//         websiteURL: "http://www.melsdiner.ca/",
//     }
// ]

export default function SwipeScreen({ data, onSwipe }: { data: CardData[], onSwipe: (id: string, action: 'left' | 'right') => Promise<null> }) {
    const [cards, setCards] = useState<CardData[]>(data);

    const activeIndex = cards.length > 0 ? cards[cards.length - 1].id : 0;
    const removeCard = (id: string, action: 'left' | 'right') => {
      setCards((prev) => prev.filter((card) => card.id !== id));
      onSwipe(id, action);
    };
  
    return (
      <div className="relative flex h-screen w-full items-center justify-center overflow-clip">
        <AnimatePresence>
          {cards.length ? (
            cards.map((card) => (
              <SwipeCard
                key={card.id}
                data={card}
                active={card.id === activeIndex}
                removeCard={removeCard}
              />
            ))
          ) : (
            <h2 className="absolute z-10 text-center text-2xl">
              You have finished voting, let's wait for the results!
            </h2>
          )}
        </AnimatePresence>
      </div>
    );
  }