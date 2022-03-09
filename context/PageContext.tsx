import { createContext, ReactNode } from "react";

const PageContext = createContext([{}, () => {}]);

interface Props {
  children: ReactNode | ReactNode[];
  url: string;
}

function PageProvider(props: Props) {
  const { children, url } = props;
  return (
    <PageContext.Provider value={[{ url }]}>{children}</PageContext.Provider>
  );
}

export { PageProvider, PageContext };
