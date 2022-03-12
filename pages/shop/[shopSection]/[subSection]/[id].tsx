import Header from "../../../../components/Header/Header";
import { getAllItems, getAllSections, getAllItemPaths } from "../../../../TestData/SectionItems";

export const getStaticPaths = async () => {
  const paths = getAllItemPaths();
  console.log(paths)
  return {
    paths,
    fallback: false,
  };
};

interface Params {
  params: {
    shopSection: string;
    subSection: string;
  };
}

export const getStaticProps = async ({ params }: Params) => {
  return {
    props: {
    },
  };
};

const Item = () => {
  return (
    <div>
      <Header />
      <p>Test</p>
    </div>
  )
}

export default Item;