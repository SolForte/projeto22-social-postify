import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { CreateMediaDto } from './create-media.dto';

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
