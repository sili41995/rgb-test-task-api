import { GeneralParams, SearchQueryKeys } from '@src/constants';
import { GetPostsQueryDto } from '@src/entities/post/dto/post.dto';
import { IFindFilters } from '@src/types/types.types';

const getFindFilters = (query: GetPostsQueryDto): IFindFilters => {
  const pageQuery = query[SearchQueryKeys.page];
  const limitQuery = query[SearchQueryKeys.limit];
  const take = limitQuery ? Number(limitQuery) : GeneralParams.recordLimit;
  const skip = pageQuery ? (Number(pageQuery) - 1) * take : 0;

  return { skip, take };
};

export default getFindFilters;
