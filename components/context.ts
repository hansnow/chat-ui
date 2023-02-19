import { authTokenName, isTokenValid, usernameName } from "@/services";
import constate from "constate";
import { useCallback, useEffect, useState } from "react";

// https://stackoverflow.com/a/9204568
function validateEmail(email: string) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

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
        const { success: isValid } = await isTokenValid(username, password);
        setPageStatus(isValid ? "chatbot" : "login");
      }
    };
    checkAuth();
  }, []);

  const auth = useCallback(async (username: string, password: string) => {
    if (!validateEmail(username)) {
      return setLoginMsg("请输入正确的邮箱地址");
    }
    const { success: isValid, errorMsg } = await isTokenValid(
      username,
      password
    );
    if (isValid) {
      localStorage.setItem(usernameName, username);
      localStorage.setItem(authTokenName, password);
      setLoginMsg("");
      setPageStatus("chatbot");
    } else {
      setLoginMsg(errorMsg);
    }
  }, []);

  const quit = useCallback(() => {
    localStorage.setItem(usernameName, "");
    localStorage.setItem(authTokenName, "");
    location.reload();
  }, []);

  const clearLoginMsg = useCallback(() => {
    setLoginMsg("");
  }, []);

  return {
    loginMsg,
    pageStatus,
    auth,
    quit,
    clearLoginMsg,
  };
});
