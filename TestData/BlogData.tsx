import blogData from "./BlogData.json";

export function getBlogIDs(): { params: { blogID: string } }[] {
  const paths = blogData.map((item) => {
    return { params: { blogID: item.id.toString() } };
  });

  return paths;
}

export function getBlogData() {
  return blogData;
}
