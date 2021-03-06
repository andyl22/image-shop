import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/slices/userSlice';

interface Props {
  children: React.ReactElement | React.ReactElement[];
}

export default function AuthGuard(props: Props) {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const { children } = props;

  useEffect(() => {
    const href = window.location.pathname;
    if (user.username) {
      const invalidURLs = ['/user/register', '/user/login'];

      if (invalidURLs.includes(href)) {
        router.push('/');
      }
    } else {
      const protectedURLs = [
        '/user/preferences',
        '/user/orders',
        '/user/account',
      ];
      if (protectedURLs.includes(href)) {
        router.push('/');
      }
    }
  });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
