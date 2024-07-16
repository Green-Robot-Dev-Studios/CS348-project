import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Label } from "@radix-ui/react-label";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "figbird";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createLazyFileRoute("/account")({
  component: Account,
});

export function Account() {
  const { user, setUser } = useCurrentUser({ redirectIfNotAuthenticated: true });
  const { patch } = useMutation("users");

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setName(user?.name ?? "");
    setEmail(user?.email?.includes("@") ? user.email : ""); // New users don't have a domain
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    try {
      await patch(user.id, { name, email, passwordHash: password });
      setUser({ ...user, name, email });
      setPassword("");
      toast("Account updated!");
    } catch (error) {
      toast("Error updating account");
      console.error(error);
    }
  }

  if (!user) return <div>Loading...</div>;

  const changed = name !== user.name || (email && email !== user.email) || password !== "";

  return (
    <Card className="flex w-full max-w-lg flex-col">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={!changed}>
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
