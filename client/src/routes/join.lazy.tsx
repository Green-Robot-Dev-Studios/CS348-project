import { Content } from "@/components/content";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useFind } from "figbird";

export const Route = createLazyFileRoute("/join")({
  component: Join,
});

export function Join() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error } = useFind("rooms", { allPages: true });

  return (
    <Content>
      {JSON.stringify(data)} {JSON.stringify(error)}
    </Content>
  );
}
