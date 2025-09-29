import { Post } from '@prisma/client';
import { IFindFilters } from './types.types';
import { UpdatePostDto } from '@src/entities/post/dto/post.dto';

export interface IPostFindFilters extends IFindFilters {
  title: string | undefined;
}

export interface IGetAll {
  data: Post[];
  count: number;
  filteredCount: number;
}

export interface IUpdateByIdProps {
  id: number;
  data: UpdatePostDto;
}
