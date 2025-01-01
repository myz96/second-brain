import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

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
        const res = await axios.get(`${apiUrl}/api/sessions/session`);
        const user = res.data;
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
    const res = await axios.post(`${apiUrl}/api/sessions`, fields);
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
    await axios.delete(`${apiUrl}/api/sessions`);
    setUser(null);
  };

  const signup = async (fields) => {
    setIsLoadingUser(true);
    const signupRes = await axios.post(`${apiUrl}/api/users`, fields);
    await axios.post(`${apiUrl}/api/sessions`, fields);
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
