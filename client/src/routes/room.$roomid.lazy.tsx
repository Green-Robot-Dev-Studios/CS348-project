import { Content } from "@/components/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import getUserOrRedirectLogin from "@/hooks/getUserOrRedirectLogin";
import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useFind, useMutation } from "figbird";
import { useCallback, useEffect } from "react";
import QRCode from "react-qr-code";

export const Route = createLazyFileRoute("/room/$roomId")({
  component: Room,
});

export function Room() {
  const user = getUserOrRedirectLogin();
  const { roomId } = Route.useParams();

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

  return (
    <Content>
      {allReady ? <Navigate to={`/preferences/${roomId}`} /> : null}
      <Card className="mx-auto flex max-w-sm flex-col items-center">
        <CardHeader className="text-xl font-semibold">QR code to share</CardHeader>
        <CardContent>
          <QRCode value={`${window.location.origin}/room/${roomId}`} />
        </CardContent>
      </Card>
      <Table className="mx-auto max-w-sm">
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Ready</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((connection) => (
            <TableRow key={connection.id}>
              <TableCell>{connection.user.name}{connection.id === userConnection?.id && " (Me)"}</TableCell>
              <TableCell>{connection.ready ? "✅" : "❌"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button className={"mx-auto block " + (userReady ? "bg-green-400" : "")} onClick={handleReady}>
        {userReady ? "Unready" : "Ready Up"}
      </Button>
    </Content>
  );
}
