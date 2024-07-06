import { useRouter } from "@tanstack/react-router";
import { useFeathers } from "figbird";
import { useEffect, useState } from "react";
import { User } from "waterfood";

const getUserOrRedirectLogin = () => {
  const feathers = useFeathers();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    feathers
      .reAuthenticate()
      .then((auth) => setUser(auth.user))
      .catch(() => router.history.push("/login"));
  }, [feathers]);

  return user;
};

export default getUserOrRedirectLogin;
