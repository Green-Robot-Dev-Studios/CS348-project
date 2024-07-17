import useAuth from "@/auth/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import generateRandomPassword from "@/utils/generateRandomPasssword";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Link, createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useFeathers, useMutation } from "figbird";
import { GithubIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type SignupSearch = {
  redirect?: string;
};

export const Route = createFileRoute("/signup")({
  component: Signup,
  validateSearch: (search: SignupSearch) => ({
    redirect: search.redirect ? String(search.redirect) : "",
  }),
});

// RFC 2822 legal examples
const choice = Math.random() > 0.5;
const nameExample = choice ? "John Doe" : "Mary Smith";

export function Signup() {
  const { user, setUser } = useAuth();
  const feathers = useFeathers();
  const { redirect } = useSearch({ from: "/signup" });
  const navigate = useNavigate();

  const { create, status } = useMutation("users");

  const [name, setName] = useState("");

  useEffect(() => {
    if (user !== null) navigate({ to: redirect || "/" });
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const email = "new-user-" + crypto.randomUUID();
      const passwordHash = generateRandomPassword();
      await create({ name, email, passwordHash });

      const result = await feathers.authenticate({ strategy: "local", email, passwordHash });
      setUser(result.user);

      navigate({ to: redirect || "/" });
    } catch (error) {
      toast("Error creating account");
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input
              id="name"
              placeholder={nameExample}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={status === "loading"}>
            Continue {status === "loading" && <Spinner />}
          </Button>
          <Button className="w-full" variant="secondary" disabled={status === "loading"} asChild>
            <a href={"/oauth/github" + (redirect ? "?redirect=" + redirect : "")}>
              <GithubIcon className="mr-4 size-4" />
              <span className="mt-0 text-sm font-medium leading-none">Continue with GitHub</span>
            </a>
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" search={{ redirect }} className="underline">
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
