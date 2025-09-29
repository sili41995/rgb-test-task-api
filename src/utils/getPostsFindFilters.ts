import { SearchQueryKeys } from '@src/constants';
import { SearchQuery } from '@src/types/types.types';
import getFindFilters from './getFindFilters';

interface IPostFindFilters {
  skip: number;
  take: number;
  title: string | undefined;
}

const getSubscriberAccountsFindFilters = (
  query: SearchQuery,
): IPostFindFilters => {
  const { skip, take } = getFindFilters(query);

  const titleQuery = query[SearchQueryKeys.title];
  const title = titleQuery ? String(titleQuery) : undefined;

  return {
    skip,
    take,
    title,
  };
};

export default getSubscriberAccountsFindFilters;
