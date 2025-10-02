import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { ErrorMessages } from '@src/constants';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetAllPostsResDto {
  @ApiProperty({
    example: [
      {
        id: 1,
        title: 'title',
        text: 'title',
        createdAt: '2025-09-29T16:31:18.336Z',
      },
    ],
  })
  data: PostDto[];

  @ApiProperty({ example: 1 })
  count: number;

  @ApiProperty({ example: 1 })
  filteredCount: number;
}

export class PostDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({
    description: 'Title of post',
    example: 'Title',
    required: true,
  })
  @IsNotEmpty({ message: ErrorMessages.titleReqErr })
  @IsString({ message: ErrorMessages.titleStringErr })
  title: string;

  @ApiProperty({
    description: 'Text of post',
    example: 'Text',
    required: true,
  })
  @IsNotEmpty({ message: ErrorMessages.textReqErr })
  @IsString({ message: ErrorMessages.textStringErr })
  text: string;

  @ApiProperty({ example: '2025-10-02T12:00:00.000Z' })
  createdAt: Date;
}

export class GetPostsQueryDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 10, description: 'Limit of posts per page' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({
    example: 'Title',
    description: 'Filter by post title',
  })
  @IsOptional()
  @IsString()
  title?: string;
}

export class CreatePostDto extends OmitType(PostDto, ['id', 'createdAt']) {}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
