import { createContext, useState, ReactNode } from "react";

type UserContextType = {
  loggedUserInfo: any;
  setLoggedUserInfo: (userInfo: any) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [loggedUserInfo, setLoggedUserInfo] = useState<null | object>(null);

  return (
    <UserContext.Provider value={{ loggedUserInfo, setLoggedUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };