import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

type ScoreCardProps = {
  title: string;
  user: string;
  value: string;
};

export default function ScoreCard(props: ScoreCardProps) {
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
