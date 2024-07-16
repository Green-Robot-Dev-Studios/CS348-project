import { useNavigate } from "@tanstack/react-router";
import { useFeathers } from "figbird";
import { useEffect, useState } from "react";
import { User } from "waterfood";

const useCurrentUser = (props = { redirectIfNotAuthenticated: false }) => {
  const feathers = useFeathers();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    feathers
      .reAuthenticate()
      .then((auth) => setUser(auth.user))
      .catch(() => {
        if (props.redirectIfNotAuthenticated)
          navigate({ to: "/signup", search: { redirect: window.location.pathname } });
      });
  }, [feathers, feathers.authentication.authenticated]);

  return { user, setUser };
};

export default useCurrentUser;
