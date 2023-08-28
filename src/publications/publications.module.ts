import { Module } from '@nestjs/common';
import { PublicationsController } from './publications.controller';
import { PublicationsRepository } from './publications.repository';
import { PublicationsService } from './publications.service';
import { MediasRepository } from 'src/medias/medias.repository';
import { MediasService } from 'src/medias/medias.service';
import { PostsRepository } from 'src/posts/posts.repository';
import { PostsService } from 'src/posts/posts.service';

@Module({
  controllers: [PublicationsController],
  providers: [
    PublicationsService,
    PublicationsRepository,
    MediasService,
    MediasRepository,
    PostsService,
    PostsRepository,
  ],
})
export class PublicationsModule {}
