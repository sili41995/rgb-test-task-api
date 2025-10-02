import { SearchQueryKeys } from '@src/constants';
import getFindFilters from './getFindFilters';
import { GetPostsQueryDto } from '@src/entities/post/dto/post.dto';

interface IPostFindFilters {
  skip: number;
  take: number;
  title: string | undefined;
}

const getSubscriberAccountsFindFilters = (
  query: GetPostsQueryDto,
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
