import { User } from "waterfood";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

type ScoreCardProps = {
  title: string;
  users: User[];
  value: string;
};

function ScoreCard({ title, users, value }: ScoreCardProps) {
  return (
    <Card className="m-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Users:
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </CardDescription>
        <CardDescription>{value}</CardDescription>
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
