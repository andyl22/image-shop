import styles from "./LoginForm.module.scss";
import FormContainer from "../Form/FormContainer";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function LoginForm() {
  const formRef = useRef<HTMLInputElement>(null);
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [errMessage, setErrorMessage] = useState();
  const router = useRouter();

  useEffect(() => {
    if (formRef.current) formRef.current.focus();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const response = 200;
    if (response === 200) {
      router.push("/shop");
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormState({ ...formState, [target.id]: target.value });
  };

  return (
    <FormContainer title="Sign In" handleSubmit={handleSubmit}>
      <p>{errMessage}</p>
      <div className={styles.formWrapper}>
        <div className={styles.inputContainer}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            ref={formRef}
            onChange={handleChange}
            value={formState.username}
            required
            aria-invalid={true}
            aria-describedby="username-error"
          />
          <span id="username-error">Test</span>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="username">Invalid Username</label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            value={formState.password}
            required
            aria-invalid={true}
            aria-describedby="password-error"
          />
          <span id="password-error">Invalid Password</span>
        </div>
        <input type="submit" value="Login" id="login" />
      </div>
    </FormContainer>
  );
}
