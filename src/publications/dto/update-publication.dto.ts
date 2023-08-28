import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
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
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;
}
