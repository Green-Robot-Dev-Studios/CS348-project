import { AuthenticationRequest } from "@feathersjs/authentication";
import { createContext } from "react";
import { User } from "waterfood";

interface AuthContext {
  user: User | null;
  setUser: (u: User | null) => void;
  logout: () => Promise<AuthenticationRequest | null | void>;
}

const AuthContext = createContext<AuthContext>({
  user: null,
  setUser: async () => {},
  logout: async () => {},
});

export default AuthContext;