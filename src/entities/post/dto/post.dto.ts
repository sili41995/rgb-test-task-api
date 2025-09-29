import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ErrorMessages } from '@src/constants';

export class CreatePostDto {
  @IsNotEmpty({ message: ErrorMessages.titleReqErr })
  @IsString({ message: ErrorMessages.titleStringErr })
  title: string;

  @IsNotEmpty({ message: ErrorMessages.textReqErr })
  @IsString({ message: ErrorMessages.textStringErr })
  text: string;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
