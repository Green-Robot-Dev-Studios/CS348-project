import { Content } from "@/components/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createLazyFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useGet } from "figbird";

export const Route = createLazyFileRoute("/results/$roomId")({
  component: ResultsPage,
});

export function ResultsPage() {
  const navigate = useNavigate();
  const { roomId } = Route.useParams();
  const { data } = useGet("rooms", roomId);

  if (data && !data.picked) return <Navigate to={`/swipe/${roomId}`} />;

  return (
    <Content>
      <div className="mx-auto w-fit space-y-5">
        <div>
          <h2 className="text-2xl font-semibold">Nice, a choice has been made by the group!</h2>
          <p className="text-muted-foreground">Looks like the majority wants to dine in...</p>
        </div>
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>{data.displayName}</CardTitle>
            <CardDescription>{data.editorialSummary}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <img loading="lazy" src={data.photoLink} className="pointer-events-none h-auto w-96 select-none"></img>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p>{data.formattedAddress}</p>
            <Button className="mt-2">
              <a href={data.websiteURL} target="_blank" rel="noopener noreferrer">
                Visit Website
              </a>
            </Button>
          </CardFooter>
        </Card>
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => {
              navigate({ to: `/scoresheet/${roomId}` });
            }}
          >
            Check out the group's score board
          </Button>
        </div>
      </div>
    </Content>
  );
}
