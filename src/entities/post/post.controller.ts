import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Post as IPost } from '@prisma/client';
import { DynamicParams, Endpoints } from '@src/constants';
import { IGetAll } from '@src/types/post.types';
import { type SearchQuery } from '@src/types/types.types';
import { getPostsFindFilters } from '@src/utils';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import PostService from './post.service';

@Controller(Endpoints.posts)
class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(Endpoints.root)
  @HttpCode(HttpStatus.OK)
  async getAll(@Query() query: SearchQuery): Promise<IGetAll> {
    const findFilters = getPostsFindFilters(query);
    const result = await this.postService.getAllBySearchQuery(findFilters);

    return result;
  }

  @Get(`:${DynamicParams.id}`)
  @HttpCode(HttpStatus.OK)
  async getById(@Param(DynamicParams.id) id: string): Promise<IPost> {
    const result = await this.postService.getById(Number(id));

    return result;
  }

  @Post(Endpoints.root)
  @HttpCode(HttpStatus.CREATED)
  async add(@Body() body: CreatePostDto): Promise<IPost> {
    console.log(body);
    const result = await this.postService.add(body);

    return result;
  }

  @Put(`:${DynamicParams.id}`)
  @HttpCode(HttpStatus.OK)
  async updateById(
    @Param(DynamicParams.id) id: string,
    @Body() body: UpdatePostDto,
  ): Promise<IPost> {
    const result = await this.postService.updateById({
      id: Number(id),
      data: body,
    });

    return result;
  }

  @Delete(`:${DynamicParams.id}`)
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param(DynamicParams.id) id: string): Promise<IPost> {
    const result = await this.postService.deleteById(Number(id));

    return result;
  }
}

export default PostController;
