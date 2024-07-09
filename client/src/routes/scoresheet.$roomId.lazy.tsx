import { Content } from "@/components/content";
import ScoreCard from "@/components/score-card";
import SkeletonCard from "@/components/skeleton-card";
import { Skeleton } from "@/components/ui/skeleton";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useGet } from "figbird";

export const Route = createLazyFileRoute("/scoresheet/$roomId")({
  component: ScoreSheet,
});

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
