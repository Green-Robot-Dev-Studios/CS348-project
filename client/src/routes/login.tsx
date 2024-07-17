import useAuth from "@/auth/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { Label } from "@radix-ui/react-dropdown-menu";
import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useFeathers } from "figbird";
import { GithubIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type LoginSearch = {
  redirect?: string;
};

export const Route = createFileRoute("/login")({
  component: Login,
  validateSearch: (search: LoginSearch) => ({
    redirect: search.redirect ? String(search.redirect) : "",
  }),
});

export function Login() {
  const { user, setUser } = useAuth();
  const feathers = useFeathers();
  const { redirect } = useSearch({ from: "/login" });
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setStatus("loading");
      const result = await feathers.authenticate({ strategy: "local", email, passwordHash: password });
      setUser(result.user);

      navigate({ to: redirect || "/" });
    } catch (error) {
      setStatus("error");
    }
  };

  const handleForgotPassword = () => {
    toast("Sorry bro... just make a new account", {
      action: {
        label: "Sign up",
        onClick: () => navigate({ to: "/signup", search: { redirect } }),
      },
    });
  };

  useEffect(() => {
    if (user !== null) navigate({ to: redirect || "/" });
  }, [user]);

  return (
    <Card className="lg:min-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
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
              tabIndex={1}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label>Password</Label>
              <Link
                href="#"
                className="ml-auto inline-block pl-8 text-sm underline"
                onClick={handleForgotPassword}
                tabIndex={5}
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              tabIndex={2}
              onChange={(e) => setPassword(e.target.value)}
            />
            {status === "error" && <div className="text-sm text-red-500">Invalid email or password</div>}
          </div>
          <Button type="submit" tabIndex={3} className="w-full" disabled={status === "loading"}>
            Login {status === "loading" && <Spinner />}
          </Button>
          <Button className="w-full" tabIndex={4} variant="secondary" disabled={status === "loading"} asChild>
            <a href={"/oauth/github" + (redirect ? "?redirect=" + encodeURIComponent(redirect) : "")}>
              <GithubIcon className="mr-4 size-4" />
              <span className="mt-0 text-sm font-medium leading-none">Continue with GitHub</span>
            </a>
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" search={{ redirect }} className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
