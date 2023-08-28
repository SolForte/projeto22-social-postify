import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';
@Injectable()
export class MediasService {
  constructor(private readonly mediasRepository: MediasRepository) {}
  // POST /medias
  async createMedia(createMediaDto: CreateMediaDto) {
    const conflictCheck = await this.mediasRepository.findMediaByUsername(
      createMediaDto.username,
      createMediaDto.title,
    );
    if (conflictCheck) {
      throw new HttpException('Conflict', 409);
    }
    return await this.mediasRepository.postMedia(createMediaDto);
  }

  // GET /medias
  async findAllMedias() {
    return await this.mediasRepository.getAllMedias();
  }

  // GET /medias/:id
  async findMediaById(id: number) {
    return await this.mediasRepository.getMediaById(id);
  }

  // PUT /medias/:id
  async updateMedia(id: number, updateMediaDto: UpdateMediaDto) {
    const conflictCheck = await this.mediasRepository.findMediaByUsername(
      updateMediaDto.username,
      updateMediaDto.title,
    );
    if (conflictCheck) {
      throw new HttpException('Conflict', 409);
    }
    const rows = await this.mediasRepository.getMediaById(id);
    if (!rows) {
      throw new NotFoundException();
    }
    if (!updateMediaDto.title) {
      updateMediaDto.title = rows.title;
    }
    if (updateMediaDto.username) {
      if (rows.username !== updateMediaDto.username) {
        updateMediaDto.username = updateMediaDto.username;
      }
    }
    return this.mediasRepository.updateMedia(id, updateMediaDto);
  }

  // DELETE /medias/:id
  async deleteMedia(id: number) {
    const rows = await this.mediasRepository.getMediaById(id);
    if (!rows) {
      throw new HttpException('Not found', 404);
    }
    const constraintsCheck =
      await this.mediasRepository.publicationsConstraintsCheck(id);
    if (constraintsCheck.length > 0) {
      throw new HttpException('Forbidden', 403);
    }
    return await this.mediasRepository.deleteMedia(id);
  }
}
