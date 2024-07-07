import { SetStateAction } from 'react';
import { Button } from "@/components/ui/button";

type SwipeButtonProps = {
    exit: (value: SetStateAction<number>) => void;
    removeCard: (id: number, action: 'right' | 'left') => void;
    id: number;
};

export default function SwipeButton({
    exit,
    removeCard,
    id,
  }: SwipeButtonProps) {
    const handleSwipe = (action: 'left' | 'right') => {
      if (action === 'left') {
        exit(-200);
      } else if (action === 'right') {
        exit(200);
      }
      removeCard(id, action);
    };
    return (
      <div className="flex items-center space-x-8 absolute top-0">
        <Button 
            onClick={() => handleSwipe('left')}
            className="px-3 py-2 rounded-md hover:bg-red-400"
        >
            Left
        </Button>
        <Button 
            onClick={() => handleSwipe('right')}
            className="px-3 py-2 rounded-md hover:bg-green-300"
        >
            Right
        </Button>
      </div>
    );
  }