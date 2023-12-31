import {
  Controller,
  Post,
  Body,
  HttpException,
  Get,
  Query,
  Param,
  Put,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsService } from './publications.service';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  create(@Body() createPublicationDto: CreatePublicationDto) {
    try {
      return this.publicationsService.createPublication(createPublicationDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get()
  async findAll(@Query() query?: { published?: boolean; after?: string }) {
    return this.publicationsService.findAllPublications(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    try {
      return this.publicationsService.findPublicationById(+id);
    } catch (error) {
      if (error.message === 'Not found') {
        throw new HttpException(error.message, 404);
      }
      throw new HttpException(error.message, 500);
    }
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updatePublicationDto: UpdatePublicationDto,
  ) {
    try {
      return this.publicationsService.updatePublication(
        +id,
        updatePublicationDto,
      );
    } catch (error) {
      if (error.message === 'Not found') {
        throw new HttpException(error.message, 404);
      }
      throw new HttpException(error.message, 500);
    }
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: number) {
    try {
      return this.publicationsService.deletePublication(+id);
    } catch (error) {
      if (error.message === 'Not found') {
        throw new HttpException(error.message, 404);
      }
      throw new HttpException(error.message, 500);
    }
  }
}
