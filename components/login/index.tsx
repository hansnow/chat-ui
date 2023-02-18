import React, { useState } from "react";
import styles from "./styles.module.css";

type LoginProps = {
  onLogin: (username: string, password: string) => void;
};

export const Login = React.memo<LoginProps>(function Login(props) {
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
          <b>订单号</b>
        </label>
        <input
          className={styles.input}
          // type="password"
          placeholder="请输入订单号"
          name="psw"
          required
          value={password}
          onChange={handlePassword}
        />

        <button className={styles.loginBtn} type="submit">
          登录
        </button>
      </div>
    </form>
  );
});
