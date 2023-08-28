import { PartialType } from '@nestjs/mapped-types';
import { CreateMediaDto } from './create-media.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMediaDto extends PartialType(CreateMediaDto) {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  username: string;
}
