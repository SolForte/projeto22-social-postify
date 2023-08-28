import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsUrl } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsOptional()
  @IsUrl()
  image: string;

  @IsOptional()
  title: string;

  @IsOptional()
  text: string;
}
