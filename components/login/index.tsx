import React, { useState } from "react";
import { useContext } from "../context";
import styles from "./styles.module.css";

type LoginProps = {
  onLogin: (username: string, password: string) => void;
};

export const Login = React.memo<LoginProps>(function Login(props) {
  const { loginMsg } = useContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    props.onLogin(username, password);
  };
  return (
    <form onSubmit={handleLogin}>
      <div className="container">
        <label htmlFor="uname">
          <b>用户名</b>
        </label>
        <input
          className={styles.input}
          type="text"
          placeholder="请输入用户名"
          name="uname"
          required
          value={username}
          onChange={handleUsername}
        />

        <label htmlFor="psw">
          <b>登录凭证</b>
        </label>
        <input
          className={styles.input}
          // type="password"
          placeholder="请输入登录凭证"
          name="psw"
          required
          value={password}
          onChange={handlePassword}
        />

        <button className={styles.loginBtn} type="submit">
          登录
        </button>
        <div className={styles.errorMsg}>{loginMsg}</div>
      </div>
    </form>
  );
});
