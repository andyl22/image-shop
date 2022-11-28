import { FormEvent, useState } from 'react';
import { postHTTP } from '../../utilities/fetchAPIs';
import FormContainer from '../Form/FormContainer';
import styles from './FormChangePassword.module.scss';

interface Props {
  postSubmitAction: any;
}

export default function FormChangePassword(props: Props) {
  const { postSubmitAction } = props;

  const initialFormState = {
    newPassword: '',
    confirmPassword: '',
  };
  const [error, setError] = useState('');
  const [formState, setFormState] = useState(initialFormState);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = formState;
    if (
      newPassword.length < 4 ||
      newPassword.length >= 20 ||
      newPassword.match(' ')
    ) {
      setError(
        'Password Invalid. Can not be more than 20 characters or contain spaces.',
      );
    } else if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
    } else {
      const body = { username: 'nonexistent', password: newPassword };
      console.log(
        newPassword,
        await postHTTP('/user/changePassword', body).catch((err) =>
          console.log(err),
        ),
      );
      postSubmitAction();
    }
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormState({ ...formState, [target.id]: target.value });
  };

  return (
    <FormContainer
      title="Change Password"
      handleSubmit={handleSubmit}
    >
      <div className={styles.changePasswordFormContent}>
        {error ? <p className={styles.error}>{error}</p> : null}
        <input
          type="password"
          id="newPassword"
          placeholder="New Password"
          onChange={handleChange}
        />
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        <input type="submit" value="Change Password" />
      </div>
    </FormContainer>
  );
}
