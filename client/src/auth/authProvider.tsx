import { useFeathers } from "figbird";
import { useEffect, useState } from "react";
import { User } from "waterfood";
import AuthContext from "./authContext";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const feathers = useFeathers();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    feathers
      .reAuthenticate()
      .then((auth) => setUser(auth.user))
      .catch(() => {});
  }, [feathers]);

  const logout = () => {
    return feathers.logout().then(() => setUser(null));
  };

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
