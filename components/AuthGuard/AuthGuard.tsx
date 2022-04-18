import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/slices/userSlice";

interface Props {
  children: React.ReactElement | React.ReactElement[];
}

export default function AuthGuard(props: Props) {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const { children } = props;

  if (user.user.username) {
    const href = window.location.pathname;
    const protectedURLs = [
      "/user/register",
      "/user/login",
      "/user/preferences",
      "/user/orders",
      "/user/account",
    ];

    if (protectedURLs.includes(href)) {
      router.push("/");
    }
  }

  return <>{children}</>;
}
