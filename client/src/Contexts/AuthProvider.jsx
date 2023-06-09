import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  useEffect(() => {
    setIsLoadingUser(true);
    const loginCheck = async () => {
      try {
        const res = await axios.get("/api/sessions/session");
        const user = res.data;
        console.log(user)
        if (res.status === 200) {
          setUser(user);
        }
        setIsLoadingUser(false);
      } catch (error) {
        console.log(error.response.data);
        setIsLoadingUser(false);
      }
    };
    loginCheck();
  }, []);

  const login = async (fields) => {
    setIsLoadingUser(true);
    const res = await axios.post("/api/sessions", fields);
    const user = res.data.user;
    if (res.status !== 200) {
      throw {
        status: res.status,
        message: user.message,
      };
    }
    setUser(user);
    setIsLoadingUser(false);
  };

  const logout = async () => {
    const res = await axios.delete("/api/sessions");
    setUser(null);
  };

  const signup = async (fields) => {
    setIsLoadingUser(true);
    const signupRes = await axios.post("/api/users", fields);
    const sessionRes = await axios.post("/api/sessions", fields);
    const user = signupRes.data;
    setUser(user);
    setIsLoadingUser(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoadingUser, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};
