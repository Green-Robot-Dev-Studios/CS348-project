import { Content } from "@/components/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import generateRandomPassword from "@/utils/generateRandomPasssword";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Link, createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { randomUUID } from "crypto";
import { useFeathers, useMutation } from "figbird";
import { GithubIcon } from "lucide-react";
import { useEffect, useState } from "react";

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
  const feathers = useFeathers();
  const { redirect } = useSearch({ from: "/signup" });
  const navigate = useNavigate();

  const { create, status } = useMutation("users");

  const [name, setName] = useState("");

  useEffect(() => {
    if (feathers.authentication.authenticated) {
      if (redirect) navigate({ to: redirect });
      else navigate({ to: "/" });
    }
  }, [feathers.authentication.authenticated]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const email = "new-user-" + crypto.randomUUID() + "@waterfood.ca";
      const passwordHash = generateRandomPassword();
      await create({ name, email, passwordHash });

      await feathers.authenticate({ strategy: "local", email, passwordHash });

      navigate({ to: redirect || "/" });
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <Content className="items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
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
            <Button type="submit" className="w-full" disabled={status === "loading"}>
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
    </Content>
  );
}
