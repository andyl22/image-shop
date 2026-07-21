import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './PathNav.module.scss';

export default function PathNav() {
  const router = useRouter();
  const urlPath = router.asPath;
  const splitPaths = urlPath.replace('/', '').split('/');
  let buildPath = '';
  const mappedPaths = splitPaths.map((path) => {
    buildPath += `/${path}`;
    return (
      <div className={styles.pathItem} key={path}>
        <p>/</p>
        <Link href={buildPath}>
          {path}
        </Link>
      </div>
    );
  });

  return (
    <div className={styles.paths} data-testid="path-nav">
      <Link href="/" data-testid="path-nav-home-link">
        home
      </Link>
      {mappedPaths}
    </div>
  );
}
