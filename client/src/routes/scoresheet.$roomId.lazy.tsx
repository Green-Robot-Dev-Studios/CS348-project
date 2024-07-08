import { Content } from "@/components/content";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useGet } from "figbird";

export const Route = createLazyFileRoute("/scoresheet/$roomId")({
  component: ScoreSheet,
});

type ScoreCardProps = {
  title: string;
  user: string;
  value: string;
};

export function ScoreSheet() {
  const { roomId } = Route.useParams();
  const { data: message, isFetching, error } = useGet("scoresheet", roomId);

  // if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const convertTime = (str: string) => {
    const [hrs, mins, secs] = str.split(":").map(Number);
    const date = new Date(0, 0, 0, hrs, mins, secs);
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${minutes} minutes ${seconds} seconds`;
  };

  console.log(message);

  return (
    <Content>
      <div className="m-5 grid grid-cols-2">
        {isFetching === false ? (
          <>
            <ScoreCard
              title="Quick Draw"
              user={message.quickDraw.user.name}
              value={convertTime(message.quickDraw.time)}
            />
            <ScoreCard
              title="Least Decisive"
              user={message.quickDraw.user.name}
              value={convertTime(message.leastDecisive.time)}
            />
            <ScoreCard
              title="Most Easygoing"
              user={message.mostEasygoing.user.name}
              value={message.mostEasygoing.voteCount}
            />
            <ScoreCard title="Most Picky" user={message.mostPicky.user.name} value={message.mostEasygoing.voteCount} />
          </>
        ) : (
          Array(4)
            .fill(0)
            .map((_, i) => <SkeletonCard key={i} />)
        )}
      </div>
    </Content>
  );
}

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

export function SkeletonCard() {
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
