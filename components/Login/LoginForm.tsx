import styles from "./LoginForm.module.scss";
import FormContainer from "../Form/FormContainer";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

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
      <div className={styles.formContainer}>
        <p>{errMessage}</p>
        <div className={styles.inputsContainer}>
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
          </div>
          <span id="username-error" className={styles.errorMessage}>
            Invalid Username
          </span>
          <div className={styles.inputContainer}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              value={formState.password}
              required
              aria-invalid={true}
              aria-describedby="password-error"
            />
          </div>
          <span id="password-error" className={styles.errorMessage}>
            Invalid Password
          </span>
          <input type="submit" value="Login" id="login" />
        </div>
        <Link href="/user/register">
          <a>Don&apos;t have an account? Register now.</a>
        </Link>
      </div>
    </FormContainer>
  );
}
