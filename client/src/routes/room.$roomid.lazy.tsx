import { Content } from "@/components/content";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import getUserOrRedirectLogin from "@/hooks/getUserOrRedirectLogin";
import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useFeathers, useFind } from "figbird";
import { useEffect } from "react";
import QRCode from "react-qr-code";

export const Route = createLazyFileRoute("/room/$roomId")({
  component: Room,
});

export function Room() {
  const { roomId } = Route.useParams();
  const { data } = useFind("connections", { query: { roomId: roomId } });

  const user = getUserOrRedirectLogin();
  const ready = data?.some((connection) => connection.userId === user?.id && connection.ready);
  console.log(data, ready)

  const allReady = data && data.length > 0 && data.every((connection) => connection.ready);

  const feathers = useFeathers();

  const handleReady = async () => {
    const { user } = await feathers.authentication.app.get("authentication");
    const { data } = await feathers.service("connections").find({ query: { roomId, userId: user.id } });
    await feathers.service("connections").patch(data[0].id, { ready: !data[0].ready });
  };

  useEffect(() => {
    const connectToRoom = async () => {
      const { user } = await feathers.authentication.app.get("authentication");
      await feathers.service("connections").create({ userId: user.id, roomId });
    };
    connectToRoom();
  }, [feathers, roomId]);

  return (
    <Content>
      {allReady ? <Navigate to={`/preferences/${roomId}`} /> : null}
      <Card className="mx-auto max-w-sm flex flex-col items-center">
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
              <TableCell>{connection.userName}</TableCell>
              <TableCell>{connection.ready ? "✅" : "❌"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button className={"block mx-auto" + (ready ? " bg-green-400" : "")} onClick={handleReady}>
        {ready ? "Unready" : "Ready Up"}
      </Button>
    </Content>
  );
}
