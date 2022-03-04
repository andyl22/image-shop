import styles from "./LoginForm.module.scss";
import FormContainer from "../Form/FormContainer";
import React, { FormEvent, useEffect, useRef, useState } from "react";

export default function LoginForm() {
  const formRef = useRef<HTMLInputElement>(null);
  const [formState, setFormState] = useState({ username: "", password: "" });

  useEffect(() => {
    if (formRef.current) {
      formRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormState({ ...formState, [target.id]: target.value });
  };

  return (
    <FormContainer title="Sign In" handleSubmit={handleSubmit}>
      <div className={styles.formWrapper}>
        <div className={styles.inputContainer}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            ref={formRef}
            onChange={handleChange}
            value={formState.username}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="username">Password</label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            value={formState.password}
          />
        </div>
        <input type="submit" value="Login" id="login" />
      </div>
    </FormContainer>
  );
}
