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
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    try {
      return this.postsService.createPost(createPostDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get()
  findAll() {
    try {
      return this.postsService.findAllPosts();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.postsService.findPostById(+id);
    } catch (error) {
      if (error.message === 'Not found') {
        throw new HttpException(error.message, 404);
      }
      throw new HttpException(error.message, 500);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    try {
      return this.postsService.updatePost(+id, updatePostDto);
    } catch (error) {
      if (error.message === 'Not found') {
        throw new HttpException(error.message, 404);
      }
      throw new HttpException(error.message, 500);
    }
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.postsService.deletePost(+id);
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
