import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreatePublicationDto } from './create-publication.dto';

export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  mediaId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  date: string;
}
