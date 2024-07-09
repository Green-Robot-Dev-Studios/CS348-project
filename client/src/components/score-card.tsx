import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

type ScoreCardProps = {
  title: string;
  user: string;
  value: string;
};

function ScoreCard(props: ScoreCardProps) {
  return (
    <Card className="m-1">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>User: {props.user}</CardDescription>
        <CardDescription>{props.value}</CardDescription>
      </CardContent>
    </Card>
  );
}

export default ScoreCard;

export function SkeletonScoreCard() {
  return (
    <div className="justify-middle my-10 flex flex-col items-center space-y-3">
      <Skeleton className="h-20 w-40 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  );
}