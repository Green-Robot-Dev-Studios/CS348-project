import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Food } from "../../../lib/client";

interface IFoodCardProps {
  food: Food;
}

const FoodCard: React.FC<IFoodCardProps> = ({ food }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{food.displayName}</CardTitle>
        <CardDescription>{food.editorialSummary}</CardDescription>
      </CardHeader>
      <CardContent>
        <img loading="lazy" src={food.photoLink}></img>
      </CardContent>
      <CardFooter>
        <p>{food.formattedAddress}</p>
      </CardFooter>
    </Card>
  );
};

export default FoodCard;
