import { Content } from "@/components/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/results/$roomId")({
    component: ResultsPage,
  });

const testFoodResult = {
  id: "0",
  displayName: "Ken Sushi",
  photoLink: "https://places.googleapis.com/v1/places/ChIJ-wWzPQf0K4gRtf3wusBBydE/photos/AUc7tXX3HRFSKRSPR7SoSENxdsFinVXI5hSshEf9SeWSdR1NAy0dZWfUjAmcsqNwO5IvQOZjIMZILhGUgiB3ymoztSu8bNppHGKTTmLnwYIrCT48gf6Rleh5R_H9A39CE8Drc4KPaTOl5misBL0uj8hG3kPcD6DEruUcnkVV/media?maxWidthPx=4032&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg",
  formattedAddress: "Blair House, 256 Phillip St, Waterloo, ON N2L 6B6, Canada",
  editorialSummary: "Cool spot for sushi, sashimi & specialty rolls, along with cooked Japanese fare.",
  websiteURL: "https://www.kensushihouse.ca/",
}

export function ResultsPage() {
  const navigate = useNavigate();
  const { roomId } = Route.useParams();
  
  return (
    <Content>
      <div className="mx-auto w-fit space-y-5">
        <div>
          <h2 className="text-2xl font-semibold">Nice, a choice has been made by the group!</h2>
          <p className="text-muted-foreground">Looks like the majority wants to dine in...</p>
        </div>
        <Card className="mx-auto max-w-md">
          <CardHeader>
              <CardTitle>{testFoodResult.displayName}</CardTitle>
              <CardDescription>{testFoodResult.editorialSummary}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
              <img loading="lazy" src={testFoodResult.photoLink} className="w-96 h-auto select-none pointer-events-none"></img>
          </CardContent>
          <CardFooter className="flex flex-col">
              <p>{testFoodResult.formattedAddress}</p>
              <Button className="mt-2">
                  <a href={testFoodResult.websiteURL} target="_blank" rel="noopener noreferrer">Visit Website</a>
              </Button>
          </CardFooter>
        </Card>
        <div  className="mt-8 flex justify-center">
          <Button onClick={() => {navigate({ to: `/scoresheet/${roomId}` })}}>Check out the group's score board</Button>
        </div>
      </div>
    </Content>
  );
}