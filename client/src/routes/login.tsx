import { Content } from "@/components/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { Label } from "@radix-ui/react-dropdown-menu";
import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useFeathers } from "figbird";
import { GithubIcon } from "lucide-react";
import { useEffect, useState } from "react";

type LoginSearch = {
  redirect?: string;
};

export const Route = createFileRoute("/login")({
  component: Login,
  validateSearch: (search: LoginSearch) => ({
    redirect: search.redirect ? String(search.redirect) : undefined,
  }),
});

export function Login() {
  const feathers = useFeathers();
  const search = useSearch({ from: "/login" });
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setStatus("loading");
      await feathers.authenticate({
        strategy: "local",
        email,
        passwordHash: password,
      });

      if (search.redirect) navigate({ to: search.redirect });
      else navigate({ to: "/" });
    } catch (error) {
      setStatus("error");
      // console.error(error);
    }
  };

  useEffect(() => {
    if (feathers.authentication.authenticated) {
      if (search.redirect) navigate({ to: search.redirect });
      else navigate({ to: "/" });
    }
  }, [feathers.authentication.authenticated]);

  return (
    <Content>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label>Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {status === "error" && <div className="text-sm text-red-500">Invalid email or password</div>}
            </div>
            <Button type="submit" className="w-full" disabled={status === "loading"}>
              Login {status === "loading" && <Spinner />}
            </Button>
            <Button className="w-full" variant="secondary" disabled={status === "loading"} asChild>
              <a href="/oauth/github">
                <GithubIcon className="mr-4 size-4" />
                <span className="mt-0 text-sm font-medium leading-none">Continue with GitHub</span>
              </a>
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </Content>
  );
}
