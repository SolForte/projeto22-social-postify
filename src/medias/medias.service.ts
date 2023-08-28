import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
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
    const result = await this.mediasRepository.postMedia(createMediaDto);
    return { title: result.title, username: result.username };
  }

  // GET /medias
  async findAllMedias() {
    const result = await this.mediasRepository.getAllMedias();
    return result.map((media) => ({
      id: media.id,
      title: media.title,
      username: media.username,
    }));
  }

  // GET /medias/:id
  async findMediaById(id: number) {
    const result = await this.mediasRepository.getMediaById(id);
    return [{ id: result.id, title: result.title, username: result.username }];
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
    const result = await this.mediasRepository.updateMedia(id, updateMediaDto);
    return [{ title: result.title, username: result.username }];
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
    await this.mediasRepository.deleteMedia(id);
  }
}
