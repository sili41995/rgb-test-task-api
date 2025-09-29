import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { ErrorMessages } from '@src/constants';
import PrismaService from '@src/db/prisma.service';
import {
  IGetAll,
  IPostFindFilters,
  IUpdateByIdProps,
} from '@src/types/post.types';
import { CreatePostDto } from './dto/post.dto';

@Injectable()
class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBySearchQuery({
    skip,
    take,
    title,
  }: IPostFindFilters): Promise<IGetAll> {
    const where: Prisma.PostWhereInput = {
      title: { startsWith: title },
    };

    const result = await this.prisma.post.findMany({
      where,
      orderBy: { title: 'asc' },
      skip,
      take,
    });
    const count = await this.prisma.post.count();
    const filteredCount = await this.prisma.post.count({ where });

    return {
      data: result,
      count,
      filteredCount,
    };
  }

  async findByTitle(title: string): Promise<Post | null> {
    const result = await this.prisma.post.findFirst({
      where: { title },
    });

    return result;
  }

  async checkNotExists(title: string): Promise<void> {
    const result = await this.findByTitle(title);

    if (result) {
      throw new ConflictException(ErrorMessages.duplicatePostErr);
    }
  }

  async checkIsExists(id: number): Promise<Post> {
    const result = await this.prisma.post.findUnique({ where: { id } });

    if (!result) {
      throw new NotFoundException(ErrorMessages.postNotFound);
    }

    return result;
  }

  async getById(id: number): Promise<Post> {
    const result = await this.checkIsExists(id);

    return result;
  }

  async add(data: CreatePostDto): Promise<Post> {
    await this.checkNotExists(data.title);

    const result = await this.prisma.post.create({
      data,
    });

    return result;
  }

  async updateById({ id, data }: IUpdateByIdProps): Promise<Post> {
    await this.checkIsExists(id);

    const result = await this.prisma.post.update({
      where: { id },
      data,
    });

    return result;
  }

  async deleteById(id: number): Promise<Post> {
    await this.checkIsExists(id);

    const result = await this.prisma.post.delete({
      where: { id },
    });

    return result;
  }
}

export default PostService;
