import { createContext } from "react";

const UserContext = createContext({
  token: '',
  setToken: async (newToken: string) => {}
});

export default UserContext;