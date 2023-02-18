import { authTokenName, isTokenValid, usernameName } from "@/services";
import constate from "constate";
import { useCallback, useEffect, useState } from "react";

export const [Provider, useContext] = constate(() => {
  const [loginMsg, setLoginMsg] = useState("");
  const [pageStatus, setPageStatus] = useState<"loading" | "login" | "chatbot">(
    "loading"
  );

  useEffect(() => {
    const checkAuth = async () => {
      const username = localStorage.getItem(usernameName);
      const password = localStorage.getItem(authTokenName);
      if (!username || !password) {
        setPageStatus("login");
      } else {
        const isValid = await isTokenValid(username, password);
        setPageStatus(isValid ? "chatbot" : "login");
      }
    };
    checkAuth();
  }, []);

  const auth = useCallback(async (username: string, password: string) => {
    const isValid = await isTokenValid(username, password);
    if (isValid) {
      localStorage.setItem(usernameName, username);
      localStorage.setItem(authTokenName, password);
      setLoginMsg("");
      setPageStatus("chatbot");
    } else {
      setLoginMsg("认证失败，请重试");
    }
  }, []);

  const quit = useCallback(() => {
    localStorage.setItem(usernameName, "");
    localStorage.setItem(authTokenName, "");
    location.reload();
  }, []);

  return {
    loginMsg,
    pageStatus,
    auth,
    quit,
  };
});
