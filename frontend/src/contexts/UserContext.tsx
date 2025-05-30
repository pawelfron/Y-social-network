import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserDetails } from "../interfaces/user";
import { UserService } from "../services/userService";
import { AuthService } from "../services/authService";

type UserContextType = {
  user: UserDetails | null;
  setUser: (user: UserDetails | null) => void;
  refreshUser: () => Promise<void>;
  loading: boolean;
};

const UserContext = createContext<UserContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const authService = AuthService.get_instance();
  const currentUserId = authService.getUserId();

  useEffect(() => {
    const fetchUser = async () => {
      if (!currentUserId) {
        setUser(null);
        setLoading(false);
        return;
      }

      const data = await UserService.getUser(currentUserId);
      setUser(data);
      setLoading(false);
    };

    fetchUser();
  }, [currentUserId]);

  const refreshUser = async () => {
    if (!currentUserId) return;

    setLoading(true);
    const updated = await UserService.getUser(currentUserId);
    setUser(updated);
    setLoading(false);
  };

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser, loading}}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
