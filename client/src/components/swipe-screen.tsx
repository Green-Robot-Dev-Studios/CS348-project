import { AnimatePresence } from 'framer-motion';
import SwipeCard from '@/components/ui/swipe-card';
import { useState } from 'react';
import { CloseFood } from 'waterfood';

export default function SwipeScreen({ closeFoods, onSwipe }: { closeFoods: CloseFood[], onSwipe: (id: string, action: 'left' | 'right') => Promise<void> }) {
    const [cards, setCards] = useState(closeFoods);

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