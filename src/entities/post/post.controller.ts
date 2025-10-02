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
import { DynamicParams, Endpoints, ErrorMessages } from '@src/constants';
import { IGetAll } from '@src/types/post.types';
import { getPostsFindFilters } from '@src/utils';
import {
  CreatePostDto,
  GetAllPostsResDto,
  GetPostsQueryDto,
  PostDto,
  UpdatePostDto,
} from './dto/post.dto';
import PostService from './post.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller(Endpoints.posts)
class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(Endpoints.root)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched posts',
    type: GetAllPostsResDto,
  })
  async getAll(@Query() query: GetPostsQueryDto): Promise<IGetAll> {
    const findFilters = getPostsFindFilters(query);
    const result = await this.postService.getAllBySearchQuery(findFilters);

    return result;
  }

  @Get(`:${DynamicParams.id}`)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched a single post',
    type: PostDto,
  })
  @ApiResponse({
    status: 404,
    description: ErrorMessages.postNotFound,
  })
  async getById(@Param(DynamicParams.id) id: string): Promise<IPost> {
    const result = await this.postService.getById(Number(id));

    return result;
  }

  @Post(Endpoints.root)
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({
    status: 201,
    description: 'Post successfully created',
    type: PostDto,
  })
  @ApiResponse({
    status: 409,
    description: ErrorMessages.duplicatePostErr,
  })
  async add(@Body() body: CreatePostDto): Promise<IPost> {
    console.log(body);
    const result = await this.postService.add(body);

    return result;
  }

  @Put(`:${DynamicParams.id}`)
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UpdatePostDto })
  @ApiResponse({
    status: 200,
    description: 'Post successfully updated',
    type: PostDto,
  })
  @ApiResponse({
    status: 404,
    description: ErrorMessages.postNotFound,
  })
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
  @ApiResponse({
    status: 200,
    description: 'Post successfully deleted',
    type: PostDto,
  })
  @ApiResponse({
    status: 404,
    description: ErrorMessages.postNotFound,
  })
  async deleteById(@Param(DynamicParams.id) id: string): Promise<IPost> {
    const result = await this.postService.deleteById(Number(id));

    return result;
  }
}

export default PostController;
