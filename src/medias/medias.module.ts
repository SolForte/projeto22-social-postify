import { Module } from '@nestjs/common';
import { MediasController } from './medias.controller';
import { MediasRepository } from './medias.repository';
import { MediasService } from './medias.service';

@Module({
  controllers: [MediasController],
  providers: [MediasService, MediasRepository],
})
export class MediasModule {}
