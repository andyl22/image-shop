import { postNode } from '../utilities/fetchAPIs';

const getShopSectionNames = async () =>
  postNode(`/items/getAllSections`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

const getSubsectionNames = async (id: any) =>
  postNode('/items/getSubsectionsBySectionID', { section: id })
    .then((res) => res.data)
    .catch((err) => console.log(err));

export { getShopSectionNames, getSubsectionNames };
