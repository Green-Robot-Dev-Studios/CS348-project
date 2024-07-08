import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SwipeButton from "@/components/ui/swipe-buttons"
import { Button } from "@/components/ui/button";

import { useState } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';

type CardProps = {
    data: CardData;
    active: boolean;
    removeCard: (id: string, action: 'right' | 'left') => void;
};

type CardData = {
  id: string;
  displayName: string;
  photoLink: string;
  formattedAddress: string;
  editorialSummary: string;
  websiteURL: string;
};

const SwipeCard = ({ data, active, removeCard }: CardProps) => {
    const [exitX, setExitX] = useState(0);
  
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -125, 0, 125, 200], [0, 1, 1, 1, 0]);
  
    const dragEnd = (
      _: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      if (info.offset.x > 100) {
        setExitX(200);
        removeCard(data.id, 'right');
      } else if (info.offset.x < -100) {
        setExitX(-200);
        removeCard(data.id, 'left');
      }
    };
  
    return (
      <>
        {active ? (
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={dragEnd}
            initial={{ scale: 0.95, opacity: 0.5 }}
            animate={{
              scale: 1.05,
              opacity: 1,
            }}
            style={{ x, rotate, opacity }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeIn' }}
            whileDrag={{ cursor: 'grabbing' }}
            exit={{ x: exitX }}
            className="top-0 absolute"
          >
            <Card>
              <CardHeader>
                  <CardTitle>{data.displayName}</CardTitle>
                  <CardDescription>{data.editorialSummary}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                  <img loading="lazy" src={data.photoLink} className="w-96 h-auto select-none pointer-events-none"></img>
              </CardContent>
              <CardFooter className="flex flex-col">
                  <p>{data.formattedAddress}</p>
                  <Button className="mt-2">
                      <a href={data.websiteURL} target="_blank" rel="noopener noreferrer">Visit Website</a>
                  </Button>
              </CardFooter>
            </Card>
            
            
          </motion.div>
        ) : null}
        <div className="relative top-20 ">
            <div className="flex justify-center">
                <SwipeButton exit={setExitX} removeCard={removeCard} id={data.id} />
            </div>
        </div>
      </>
    );
  };
  
  export default SwipeCard;