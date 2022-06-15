import React, { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './LoginForm.module.scss';
import FormContainer from '../Form/FormContainer';
import { postHTTP } from '../../utilities/fetchAPIs';
import { useAppDispatch } from '../../redux/hooks';
import { login } from '../../redux/slices/userSlice';

export default function LoginForm() {
  const formRef = useRef<HTMLInputElement>(null);
  const [formState, setFormState] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<String | null>(
    null,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (formRef.current) formRef.current.focus();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const body = {
      username: formState.username,
      password: formState.password,
    };
    const response = await postHTTP('/user/login', body).catch(() =>
      setErrorMessage('Server Error'),
    );

    if (!response) {
      setErrorMessage('Server Error');
    } else if (!response.success) {
      setErrorMessage(response.data);
    } else {
      dispatch(login());
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormState({ ...formState, [target.id]: target.value });
  };

  return (
    <FormContainer title="Sign In" handleSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        {errorMessage ? (
          <p className={styles.bannerError}>{errorMessage}</p>
        ) : null}
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
              aria-invalid
              aria-describedby="username-error"
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              value={formState.password}
              required
              aria-invalid
              aria-describedby="password-error"
            />
          </div>
          <input type="submit" value="Login" id="login" />
        </div>
        <Link href="/user/register">
          <a>Don&apos;t have an account? Register now.</a>
        </Link>
      </div>
    </FormContainer>
  );
}
