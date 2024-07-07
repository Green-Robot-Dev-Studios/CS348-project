import { useNavigate } from "@tanstack/react-router";
import { useFeathers } from "figbird";
import { useEffect, useState } from "react";
import { User } from "waterfood";

const getUserOrRedirectLogin = () => {
  const feathers = useFeathers();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    feathers
      .reAuthenticate()
      .then((auth) => setUser(auth.user))
      .catch(() => navigate({ to: "/login" }));
  }, [feathers]);

  return user;
};

export default getUserOrRedirectLogin;
