import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("kamkaj_user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const handleLogout = () => {
      setUser(null);
    };

    window.addEventListener("kamkaj:logout", handleLogout);

    return () => {
      window.removeEventListener("kamkaj:logout", handleLogout);
    };
  }, []);

  const login = (userData, token) => {
    if (token) {
      localStorage.setItem("token", token);
    }

    localStorage.setItem(
      "kamkaj_user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("kamkaj_user");
    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
