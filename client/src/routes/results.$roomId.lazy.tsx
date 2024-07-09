import { Content } from "@/components/content";
import ScoreCard, { SkeletonScoreCard } from "@/components/score-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import formatTime from "@/utils/formatTime";
import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useGet } from "figbird";
import { Scoresheet } from "../../../lib/client";

export const Route = createLazyFileRoute("/results/$roomId")({
  component: ResultsPage,
});

export function ResultsPage() {
  const { roomId } = Route.useParams();
  const { data } = useGet("rooms", roomId);
  const pickedFood = data?.pickedFood;
  const { data: scoresheet, isFetching } = useGet<Scoresheet>("scoresheet", roomId);

  if (data && !data.picked) return <Navigate to={`/swipe/${roomId}`} />;
  if (!pickedFood) return <div>Loading...</div>;

  return (
    <Content>
      <div className="mx-auto w-fit space-y-5">
        <div>
          <h2 className="text-2xl font-semibold">Nice, a choice has been made by the group!</h2>
          <p className="text-muted-foreground">Looks like the majority wants to dine in...</p>
        </div>
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>{pickedFood.displayName}</CardTitle>
            <CardDescription>{pickedFood.editorialSummary}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <img loading="lazy" src={pickedFood.photoLink} className="pointer-events-none h-auto w-96 select-none"></img>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p>{pickedFood.formattedAddress}</p>
            <Button className="mt-2">
              <a href={pickedFood.websiteURL} target="_blank" rel="noopener noreferrer">
                Visit Website
              </a>
            </Button>
          </CardFooter>
        </Card>
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Scorecard</CardTitle>
          </CardHeader>
          <CardContent>
            {scoresheet && !isFetching ? (
              <>
                <ScoreCard
                  title="Quick Draw"
                  users={scoresheet.quickDraw.users}
                  value={formatTime(scoresheet.quickDraw.time.toString())}
                />
                <ScoreCard
                  title="Least Decisive"
                  users={scoresheet.leastDecisive.users}
                  value={formatTime(scoresheet.leastDecisive.time.toString())}
                />
                <ScoreCard
                  title="Most Easygoing"
                  users={scoresheet.mostEasygoing.users}
                  value={scoresheet.mostEasygoing.voteCount.toString()}
                />
                <ScoreCard
                  title="Most Picky"
                  users={scoresheet.mostPicky.users}
                  value={scoresheet.mostPicky.voteCount.toString()}
                />
              </>
            ) : (
              Array(4)
                .fill(0)
                .map((_, i) => <SkeletonScoreCard key={i} />)
            )}
          </CardContent>
        </Card>
      </div>
    </Content>
  );
}
