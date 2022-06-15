import { FormEventHandler, ReactNode } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import styles from './FormContainer.module.scss';

interface Prop {
  children: ReactNode;
  title: string;
  handleSubmit: FormEventHandler;
}

export default function FormContainer(props: Prop) {
  const { children, title, handleSubmit } = props;
  return (
    <form className={styles.formStyle} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        {title ? <h1>{title}</h1> : null}
      </div>
      <div className={styles.formContent}>{children}</div>
    </form>
  );
}
