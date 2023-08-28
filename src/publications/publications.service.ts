import { HttpException, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './publications.repository';

@Injectable()
export class PublicationsService {
  constructor(
    private readonly publicationsRepository: PublicationsRepository,
  ) {}

  // POST /publications
  async createPublication(createPublicationDto: CreatePublicationDto) {
    const media = await this.publicationsRepository.mediasConstraintCheck(
      createPublicationDto.mediaId,
    );
    if (!media) {
      throw new HttpException('Not found', 404);
    }
    const post = await this.publicationsRepository.postConstraintCheck(
      createPublicationDto.postId,
    );
    if (!post) {
      throw new HttpException('Not found', 404);
    }
    const result =
      await this.publicationsRepository.postPublication(createPublicationDto);
    return {
      mediaId: result.mediaId,
      postId: result.postId,
      date: result.date,
    };
  }

  // GET /publications
  async findAllPublications(query?: { published?: boolean; after?: string }) {
    const result = await this.publicationsRepository.getAllPublications();

    if (query?.published) {
      const published = result.filter(
        (publication) => new Date(publication.date) > new Date(),
      );
      return published.map((publication) => ({
        id: publication.id,
        mediaId: publication.mediaId,
        postid: publication.postId,
        date: publication.date,
      }));
    }

    if (query?.after) {
      const after = result.filter(
        (publication) => new Date(publication.date) > new Date(query.after),
      );
      return after.map((publication) => ({
        id: publication.id,
        mediaId: publication.mediaId,
        postid: publication.postId,
        date: publication.date,
      }));
    }

    return result.map((publication) => ({
      id: publication.id,
      mediaId: publication.mediaId,
      postid: publication.postId,
      date: publication.date,
    }));
  }

  // GET /publications/:id
  async findPublicationById(id: number) {
    const rows = await this.publicationsRepository.getPublicationById(id);
    if (!rows) {
      throw new HttpException('Not found', 404);
    }
    return [
      {
        id: rows.id,
        mediaId: rows.mediaId,
        postId: rows.postId,
        date: rows.date,
      },
    ];
  }

  // PUT /publications/:id
  async updatePublication(
    id: number,
    updatePublicationDto: UpdatePublicationDto,
  ) {
    const mediasCheck = await this.publicationsRepository.mediasConstraintCheck(
      updatePublicationDto.mediaId,
    );
    if (!mediasCheck) {
      throw new HttpException('Not found', 404);
    }
    const postsCheck = await this.publicationsRepository.postConstraintCheck(
      updatePublicationDto.postId,
    );
    if (!postsCheck) {
      throw new HttpException('Not found', 404);
    }
    const rows = this.publicationsRepository.getPublicationById(id);
    if (!rows) {
      throw new HttpException('Not found', 404);
    }
    const result = await this.publicationsRepository.updatePublication(
      id,
      updatePublicationDto,
    );
    return [
      {
        id: result.id,
        mediaId: result.mediaId,
        postId: result.postId,
        date: result.date,
      },
    ];
  }

  // DELETE /publications/:id
  async deletePublication(id: number) {
    const result = await this.publicationsRepository.getPublicationById(id);
    if (!result) {
      throw new HttpException('Not found', 404);
    }
    await this.publicationsRepository.deletePublication(id);
  }
}
