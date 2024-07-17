import useAuth from "@/auth/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

const useProtectRoute = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate({ to: "/signup", search: { redirect: window.location.pathname } });
    }
  }, [user]);
};

export default useProtectRoute;
