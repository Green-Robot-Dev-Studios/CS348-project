import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, MapPin } from "lucide-react";

import { useState } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import getPhotoLink from "@/utils/getPhotoLink";
import { CloseFood } from "waterfood";
import { cn } from "@/lib/utils";

type CardProps = {
  data: CloseFood;
  active?: boolean;
  removeCard: (id: string, action: "right" | "left") => void;
};

const SwipeCard = ({ data, active, removeCard }: CardProps) => {
  const [exitX, setExitX] = useState(0);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -125, 0, 125, 200], [0, 1, 1, 1, 0]);

  const dragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      setExitX(200);
      removeCard(data.id, "right");
    } else if (info.offset.x < -100) {
      setExitX(-200);
      removeCard(data.id, "left");
    }
  };

  const buttonSwipe = (action: "left" | "right") => {
    if (action === "left") {
      setExitX(-200);
    } else if (action === "right") {
      setExitX(200);
    }
    removeCard(data.id, action);
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={dragEnd}
      initial={{ scale: 1, opacity: 0.5 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{ x, rotate, opacity }}
      transition={{ type: "tween", duration: 0.3, ease: "easeIn" }}
      whileDrag={{ cursor: "grabbing" }}
      exit={{ x: exitX }}
      className={cn("absolute h-[calc(100%-2rem)]")}
    >
      <Card className="m-4 mt-0 flex h-full flex-grow flex-col">
        <CardHeader>
          <CardTitle>{data.displayName}</CardTitle>
          <CardDescription>{data.editorialSummary}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-clip">
          <img loading="lazy" src={getPhotoLink(data.id)} className="pointer-events-none select-none"></img>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p>{data.formattedAddress}</p>
        </CardFooter>

        <div className="flex flex-row justify-between p-6 pt-0">
          <Button
            size="icon"
            onClick={() => buttonSwipe("left")}
            className="h-11 w-11 rounded-full bg-red-400 px-3 py-2"
          >
            <X />
          </Button>
          <Button className="h-11 w-11 rounded-full" asChild size="icon">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${data.displayName}&query_place_id=${data.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin />
            </a>
          </Button>
          <Button
            size="icon"
            onClick={() => buttonSwipe("right")}
            className="h-11 w-11 rounded-full bg-green-300 px-3 py-2"
          >
            <Check />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default SwipeCard;
