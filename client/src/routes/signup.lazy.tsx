import { Content } from "@/components/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Link, createLazyFileRoute, useRouter } from "@tanstack/react-router";
import { useFeathers, useMutation } from "figbird";
import { GithubIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createLazyFileRoute("/signup")({
  component: Login,
});

// RFC 2822 legal examples
const choice = Math.random() > 0.5;
const nameExample = choice ? "John Doe" : "Mary Smith";
const emailExample = choice ? "jdoe@example.com" : "mary@example.com";

export function Login() {
  const feathers = useFeathers();
  const router = useRouter();

  const { create, error, status } = useMutation("users");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (feathers.authentication.authenticated) {
      router.history.back();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await create({ name, email, passwordHash: password });

      await feathers.authenticate({
        strategy: "local",
        email,
        passwordHash: password,
      });

      router.history.back();
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <Content>
      <Card className="mx-auto max-w-sm">
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
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={emailExample}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <div className="text-red-500">That email is already taken</div>}
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full" disabled={status === "loading"}>
              Create an account {status === "loading" && <Spinner />}
            </Button>
            <Button className="w-full" variant="secondary" disabled={status === "loading"} asChild>
              <a href="/oauth/github">
                <GithubIcon className="mr-4 size-4" />
                <span className="mt-0 text-sm font-medium leading-none">Continue with GitHub</span>
              </a>
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </Content>
  );
}
