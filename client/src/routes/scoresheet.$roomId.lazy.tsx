import { Content } from "@/components/content";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/scoresheet/$roomId")({
  component: ScoreSheet,
});

const testObj = {
  quickDraw: "12345",
};

type ScoreCardProps = {
  title: string;
  value: string;
};

function ScoreCard(props: ScoreCardProps) {
  return (
    <Card className="m-1">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.value}</CardDescription>
      </CardHeader>
    </Card>
  );
}

export function ScoreSheet() {
  const { roomId } = Route.useParams();
  console.log(roomId) // TODO: use this to fetch the actual data...

  return (
    <Content>
      <div className="m-5 grid grid-cols-2">
        <ScoreCard title="Quick Draw" value={testObj.quickDraw} />
        <ScoreCard title="Least Decisive" value="test" />
        <ScoreCard title="Most Picky" value="test" />
        <ScoreCard title="Most Easygoing" value="test" />
      </div>
    </Content>
  );
}
