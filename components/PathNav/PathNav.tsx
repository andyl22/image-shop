import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./PathNav.module.scss";

export default function PathNav() {
  const router = useRouter();
  const path = router.asPath;
  const splitPaths = path.replace("/", "").split("/");
  let buildPath = "";
  const mappedPaths = splitPaths.map((path) => {
    buildPath += `/${path}`;
    return (
      <div className={styles.pathItem} key={path}>
        <p>/</p>
        <Link href={buildPath}>
          <a>{path}</a>
        </Link>
      </div>
    );
  });

  return (
    <div className={styles.paths}>
      <Link href="/">
        <a>home</a>
      </Link>
      {mappedPaths}
    </div>
  );
}
