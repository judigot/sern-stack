import React from "react";

interface Props {}

export const LoginForm = (props: Props) => {
  return (
    <div className="login-form">
      <form>
        <label>Username</label>
        <input type="text" name="email" />

        <label>Password</label>
        <input type="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
