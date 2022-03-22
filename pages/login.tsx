import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header/Header";
import LoginForm from "../components/Login/LoginForm";
import styles from "../styles/Login.module.scss";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { add, selectCart } from "../redux/slices/cartSlice";

const Login: NextPage = () => {
  const cart = useAppSelector((state) => selectCart(state));
  const dispatch = useAppDispatch();

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="The Image Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <LoginForm />
        <button onClick={() => dispatch(add())}>Test</button>
      </main>
    </>
  );
};

export default Login;
