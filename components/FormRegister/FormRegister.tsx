import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './FormRegister.module.scss';
import FormContainer from '../Form/FormContainer';
import debounce from '../../utilities/debounce';
import { postHTTP } from '../../utilities/fetchAPIs';
import { useAppDispatch } from '../../redux/hooks';
import { login } from '../../redux/slices/userSlice';

export default function FormRegister() {
  const formRef = useRef<HTMLInputElement>(null);
  const [formState, setFormState] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [invalidUsername, setinvalidUsername] = useState('');
  const [invalidPassword, setinvalidPassword] = useState('');
  const [invalidConfirmPassword, setinvalidConfirmPassword] =
    useState('');
  const [errMessage, setErrorMessage] = useState<String | null>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (formRef.current) formRef.current.focus();
  }, []);

  // Handle user registration
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formState.password !== formState.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    const body = {
      username: formState.username,
      password: formState.password,
    };
    const registerResponse = await postHTTP(
      '/user/register',
      body,
    ).catch((err) => console.log(err));

    // If register is successful, then also log the user in with the registered credentials
    if (registerResponse.success === true) {
      const loginResponse = await postHTTP('/user/login', body).catch(
        () => setErrorMessage('Server Error'),
      );
      if (loginResponse.success === true) {
        router.push('/shop');
        dispatch(login());
      }
    } else if (registerResponse.data)
      setinvalidUsername(registerResponse.data);
  };

  const validations = (value: String, inputType: String) => {
    switch (inputType) {
      case 'username':
        if (value.includes(' ') || value.length > 20) {
          setinvalidUsername(
            'Invalid Username. Can not contain spaces or be more than 20 characters.',
          );
        } else {
          setinvalidUsername('');
        }
        break;
      case 'password':
        if (value.includes(' ') || value.length > 20) {
          setinvalidPassword(
            'Password Invalid. Can not be more than 20 characters or contain spaces.',
          );
        } else if (
          formState.confirmPassword &&
          value !== formState.confirmPassword
        ) {
          setinvalidPassword('');
          setinvalidConfirmPassword('Passwords do not match.');
        } else {
          setinvalidConfirmPassword('');
          setinvalidPassword('');
        }
        break;
      case 'confirmPassword':
        if (value.includes(' ') || value.length > 20) {
          setinvalidConfirmPassword(
            'Password Invalid. Can not be more than 20 characters or contain spaces.',
          );
        } else if (
          value !== formState.password &&
          formState.confirmPassword
        ) {
          setinvalidConfirmPassword('Passwords do not match.');
        } else {
          setinvalidConfirmPassword('');
        }
        break;
      default:
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const debouncedValidations = debounce(validations, 500);
    debouncedValidations(target.value, target.id);
    setFormState({ ...formState, [target.id]: target.value });
  };

  return (
    <FormContainer title="Register" handleSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        <p className={styles.bannerError}>{errMessage}</p>
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
              aria-invalid={!invalidUsername}
              aria-describedby="username-error"
            />
          </div>
          {invalidUsername ? (
            <span id="username-error" className={styles.inputError}>
              {invalidUsername}
            </span>
          ) : null}
          <div className={styles.inputContainer}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              value={formState.password}
              required
              aria-invalid={!invalidPassword}
              aria-describedby="password-error"
            />
          </div>
          {invalidPassword ? (
            <span id="password-error" className={styles.inputError}>
              {invalidPassword}
            </span>
          ) : null}
          <div className={styles.inputContainer}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              onChange={handleChange}
              value={formState.confirmPassword}
              required
              aria-invalid={!invalidConfirmPassword}
              aria-describedby="password-error"
            />
          </div>
          {invalidConfirmPassword ? (
            <span id="password-error" className={styles.inputError}>
              {invalidConfirmPassword}
            </span>
          ) : null}
          <input type="submit" value="Register" id="Register" />
        </div>
      </div>
    </FormContainer>
  );
}
