import { Injectable, HttpException } from '@nestjs/common';
import { Publications } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Injectable()
export class PublicationsRepository {
  constructor(private readonly prisma: PrismaService) {}
  // POST /publications
  async postPublication(
    createPublicationDto: CreatePublicationDto,
  ): Promise<Publications> {
    const result = this.prisma.publications.create({
      data: createPublicationDto,
    });
    return result;
  }

  // GET /publications
  async getAllPublications(): Promise<Publications[]> {
    const result = await this.prisma.publications.findMany({});
    return result;
  }

  // GET /publications/:id
  async getPublicationById(id: number): Promise<Publications> {
    const result = await this.prisma.publications.findUnique({
      where: { id },
    });
    return result;
  }

  // PUT /publications/:id
  async updatePublication(
    id: number,
    updatePublicationDto: UpdatePublicationDto,
  ): Promise<Publications> {
    const rows = await this.getPublicationById(id);
    if (!rows) {
      throw new HttpException('Not found', 404);
    }
    if (rows.date <= new Date()) {
      throw new HttpException('Forbidden', 403);
    }
    return this.prisma.publications.update({
      where: { id },
      data: updatePublicationDto,
    });
  }

  // DELETE /publications/:id
  async mediasConstraintCheck(id: number) {
    const result = await this.prisma.medias.findFirst({
      where: { id },
    });
    return result;
  }

  async postConstraintCheck(id: number) {
    const result = await this.prisma.posts.findFirst({
      where: { id },
    });
    return result;
  }
  async deletePublication(id: number) {
    const rows = await this.getPublicationById(id);
    if (!rows) {
      throw new HttpException('Not found', 404);
    }
    return this.prisma.publications.delete({
      where: { id },
    });
  }
}
