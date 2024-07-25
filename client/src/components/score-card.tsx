import { User } from "waterfood";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import DisplayUser from "./display-user";

type ScoreCardProps = {
  title: string;
  users: User[];
  value: string;
};

function ScoreCard({ title, users, value }: ScoreCardProps) {
  return (
    <Card className="m-1 mb-3 flex flex-col py-1 align-middle shadow-[0_0px_20px_rgba(255,_255,_255,_0.1)_inset]">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="">
        {/* <CardDescription className="mb-2">Users:</CardDescription> */}
        <ul className="mb-5">
          {users.map((user) => (
            <li key={user.id}>
              <DisplayUser className="mb-2" user={user} />
            </li>
          ))}
        </ul>
        <CardDescription className="text-center">{value}</CardDescription>
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
