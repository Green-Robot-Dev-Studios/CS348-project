import useAuth from "@/auth/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useProtectRoute from "@/hooks/useProtectRoute";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "figbird";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createLazyFileRoute("/account")({
  component: Account,
});

export function Account() {
  useProtectRoute();
  const { user, setUser } = useAuth();
  const { patch } = useMutation("users");

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");

  const newUser = !(user?.email?.includes("@") || false);

  useEffect(() => {
    setName(user?.name ?? "");
    setEmail(newUser ? "" : user?.email ?? ""); // New users don't have a domain
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    try {
      const result = await patch(user.id, { name, email, passwordHash: password || undefined });
      if (newUser) toast.success("Email and password set!");
      else toast.success("Account updated")
      setUser(result);
      setPassword("");
    } catch (error) {
      toast.error("Error updating account");
      console.error(error);
    }
  };

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
            <Label htmlFor="name">Name</Label>
            <Input id="name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{newUser ? "Password*" : "New Password"}</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              required={newUser}
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
