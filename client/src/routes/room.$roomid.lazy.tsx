import useAuth from "@/auth/useAuth";
import DisplayUser from "@/components/display-user";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useProtectRoute from "@/hooks/useProtectRoute";
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
  useProtectRoute();
  const { roomid: roomId } = Route.useParams();

  const { user } = useAuth();

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

  const handleShare = () => navigator.share({ url: `${window.location.origin}/room/${roomId}` }).catch(() => {});

  if (allReady) return <Navigate to={`/preferences/${roomId}`} />;

  return (
    <Card className="flex flex-grow flex-col p-4 gap-4">
      <div className="mx-auto flex flex-col gap-4">
        <Card
          className="cursor-pointer bg-white p-4 shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl"
          onClick={handleShare}
        >
          <QRCode value={`${window.location.origin}/room/${roomId}`} />
        </Card>
        <Button className={cn("w-full", userReady ? "bg-green-400 hover:bg-green-500" : null)} onClick={handleReady}>
          {userReady ? "Unready" : "Ready Up"}
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Ready</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((connection) => (
            <TableRow key={connection.id} className={cn(connection.userId === user?.id && "bg-muted/40")}>
              <TableCell>
                <DisplayUser user={connection.user} avatarClassName="size-8" />
              </TableCell>
              <TableCell>
                {connection.ready ? <CheckIcon className="text-green-500" /> : <XIcon className="text-red-500" />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
