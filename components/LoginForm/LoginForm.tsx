import styles from "./LoginForm.module.scss";
import Form from "../Form/Form";
import { SyntheticEvent, useEffect, useRef } from "react";

export default function LoginForm() {
  const formRef = useRef();

  useEffect(() => {
    formRef.current.focus();
  });

  const handleFocus = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    if (["text", "password"].includes(target.type)) {
      if (target.value !== null) {
        const label = document.createElement("label");
        label.setAttribute("for", target.id);
        label.textContent = target.placeholder;
        target.appendChild(label);
      }
    }
  };

  return (
    <Form parentStyles={styles.loginForm}>
      <input
        type="text"
        id="login-username"
        placeholder="Username"
        ref={formRef}
        onFocus={handleFocus}
      />
      <input type="password" id="login-password" placeholder="Password" />
      <input type="button" value="Login" />
    </Form>
  );
}
