import { Content } from "@/components/content";
import DisplayUser from "@/components/display-user";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useCurrentUser from "@/hooks/useCurrentUser";
import { cn } from "@/lib/utils";
import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useFind, useMutation } from "figbird";
import { CheckIcon, XIcon } from "lucide-react";
import { useCallback, useEffect } from "react";
import QRCode from "react-qr-code";

export const Route = createLazyFileRoute("/room/$roomid")({
  component: Room,
});

export function Room() {
  const { roomid: roomId } = Route.useParams();

  const user = useCurrentUser({ redirectIfNotAuthenticated: true });

  const { data } = useFind("connections", { query: { roomId } });
  const userConnection = data?.find((connection) => connection.userId === user?.id);
  const { create, patch } = useMutation("connections");

  const userReady = userConnection?.ready;
  const allReady = data && data.length > 0 && data.every((connection) => connection.ready);

  const handleReady = useCallback(() => {
    if (!userConnection) return;
    patch(userConnection.id, { ready: !userConnection.ready });
  }, [userConnection]);

  useEffect(() => {
    if (!roomId || !user) return;
    create({ userId: user.id, roomId });
  }, [roomId, user]);

  const handleShare = () => {
    navigator.share({
      title: "Decide where to eat with Waterfood!",
      text: "Join my room",
      url: window.location.toString(),
    });
  };

  if (allReady) return <Navigate to={`/preferences/${roomId}`} />;

  return (
    <Content className="gap-6">
      <div className="flex justify-center">
        <Card
          className="cursor-pointer p-2 shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl"
          onClick={handleShare}
        >
          <QRCode value={window.location.toString()} />
        </Card>
      </div>
      <Button className={cn("mx-auto block", userReady ? "bg-green-400" : null)} onClick={handleReady}>
        {userReady ? "Unready" : "Ready Up"}
      </Button>
      <Table className="mx-auto max-w-lg">
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Ready</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((connection) => (
            <TableRow key={connection.id} className={cn(connection.userId === user?.id && "bg-muted")}>
              <TableCell>
                <DisplayUser user={connection.user} />
              </TableCell>
              <TableCell>
                {connection.ready ? <CheckIcon className="text-green-500" /> : <XIcon className="text-red-500" />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Content>
  );
}
