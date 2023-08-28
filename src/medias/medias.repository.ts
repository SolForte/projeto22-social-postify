import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Medias as MediaModel } from '@prisma/client';
import { MediaEntity } from './entities/media.entity';

@Injectable()
export class MediasRepository {
  constructor(private readonly prisma: PrismaService) {}

  // POST /medias
  async postMedia(createMediaDto: CreateMediaDto): Promise<MediaModel> {
    const { title, username } = createMediaDto;
    const mediaEntity = new MediaEntity(title, username);
    const result = await this.prisma.medias.create({
      data: mediaEntity,
    });
    return result;
  }

  async findMediaByUsername(
    createMediaDtoUsername: string,
    createMediaDtoTitle: string,
  ): Promise<MediaModel | unknown> {
    const createEntity: MediaEntity = new MediaEntity(
      createMediaDtoTitle,
      createMediaDtoUsername,
    );
    const { username, title } = createEntity;
    const result = await this.prisma.medias.findFirst({
      where: {
        username: username,
        title: title,
      },
    });
    return result;
  }

  // GET /medias
  getAllMedias(): Promise<MediaModel[]> {
    const result = this.prisma.medias.findMany();
    return result;
  }

  // GET /medias/:id
  async getMediaById(id: number): Promise<MediaModel> {
    const result = await this.prisma.medias.findUnique({
      where: { id },
    });
    return result;
  }

  // PUT /medias/:id
  async updateMedia(id: number, updateMediaDto: UpdateMediaDto) {
    const updatedMedia = await this.prisma.medias.update({
      where: { id },
      data: updateMediaDto,
    });
    return updatedMedia;
  }

  // DELETE /medias/:id
  async deleteMedia(id: number) {
    const result = await this.prisma.medias.delete({
      where: { id },
    });
    return result;
  }

  async publicationsConstraintsCheck(id: number) {
    const publications = await this.prisma.publications.findMany({
      where: { mediaId: id },
    });
    return publications;
  }
}
