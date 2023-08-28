import {
  Controller,
  Post,
  Body,
  HttpException,
  Get,
  Param,
  Put,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasService } from './medias.service';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post()
  create(@Body() createMediaDto: CreateMediaDto) {
    try {
      return this.mediasService.createMedia(createMediaDto);
    } catch (error) {
      if (error.message === 'Conflict') {
        throw new HttpException(error.message, 409);
      }
      throw new HttpException(error.message, 500);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.mediasService.findAllMedias();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.mediasService.findMediaById(+id);
    if (!result) {
      throw new HttpException('Not found', 404);
    }
    return result;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    try {
      return this.mediasService.updateMedia(+id, updateMediaDto);
    } catch (error) {
      if (error.message === 'Not found') {
        throw new HttpException(error.message, 404);
      }
      if (error.message === 'Conflict') {
        throw new HttpException(error.message, 409);
      }
      throw new HttpException(error.message, 500);
    }
  }
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return this.mediasService.deleteMedia(+id);
    } catch (error) {
      if (error.message === 'Not found') {
        throw new HttpException(error.message, 404);
      }
      if (error.message === 'Forbidden') {
        throw new HttpException(error.message, 403);
      }
      throw new HttpException(error.message, 500);
    }
  }
}
