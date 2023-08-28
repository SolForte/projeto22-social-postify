import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediaEntity } from './entities/media.entity';
import { Medias } from '@prisma/client';

@Injectable()
export class MediasRepository {
  constructor(private readonly prisma: PrismaService) {}

  // POST /medias
  async postMedia(createMediaDto: CreateMediaDto): Promise<Medias> {
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
  ): Promise<Medias | unknown> {
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
  getAllMedias(): Promise<Medias[]> {
    const result = this.prisma.medias.findMany();
    return result;
  }

  // GET /medias/:id
  async getMediaById(id: number): Promise<Medias> {
    const result = await this.prisma.medias.findUnique({
      where: { id },
    });
    return result;
  }

  // PUT /medias/:id
  async updateMedia(id: number, updateMediaDto: UpdateMediaDto) {
    const result = await this.prisma.medias.update({
      where: { id },
      data: updateMediaDto,
    });
    return result;
  }

  // DELETE /medias/:id
  async publicationsConstraintsCheck(id: number) {
    const result = await this.prisma.publications.findMany({
      where: { mediaId: id },
    });
    return result;
  }

  async deleteMedia(id: number) {
    const result = await this.prisma.medias.delete({
      where: { id },
    });
    return result;
  }
}
