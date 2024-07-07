import AppMenu from "@/components/app-menu";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useFind } from "figbird";
import QRCode from "react-qr-code";

export const Route = createLazyFileRoute("/room/$roomid")({
  component: Room,
});

export function Room() {
  const { roomid } = Route.useParams();
  const { data } = useFind("connections", { query: { roomId: roomid } })

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppMenu />
      <div className="pl-16">
        <QRCode value={`${window.location.origin}/room/${roomid}`} />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Ready</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((connection) => (
              <TableRow key={connection.id}>
                <TableCell>{connection.userId}</TableCell>
                <TableCell>{connection.ready ? "✅" : "❌"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button>Ready Up</Button>
      </div>
    </div>
  );
}
