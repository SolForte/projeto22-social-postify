import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';
import { FormattingHelper } from 'src/helpers/formatting.helper';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}
  // POST /posts
  async createPost(createPostDto: CreatePostDto) {
    const result = await this.postsRepository.postPost(createPostDto);
    return FormattingHelper.filterPostPropertiesAndRemoveId(result);
  }

  // GET /posts
  async findAllPosts() {
    const result = await this.postsRepository.getAllPosts();
    return result.map((post) =>
      FormattingHelper.filterPostPropertiesAndKeepId(post),
    );
  }

  // GET /posts/:id
  async findPostById(id: number) {
    const rows = await this.postsRepository.getPostById(id);
    if (!rows) {
      throw new HttpException('Not found', 404);
    }
    return [FormattingHelper.filterPostPropertiesAndKeepId(rows)];
  }

  // PUT /posts/:id
  async updatePost(id: number, updatePostDto: UpdatePostDto) {
    const rows = await this.postsRepository.getPostById(id);
    if (!rows) {
      throw new HttpException('Not found', 404);
    }
    const result = await this.postsRepository.updatePost(id, updatePostDto);
    return [FormattingHelper.filterPostPropertiesAndRemoveId(result)];
  }

  // DELETE /posts/:id
  async deletePost(id: number) {
    const rows = await this.postsRepository.getPostById(id);
    if (!rows) {
      throw new HttpException('Not found', 404);
    }
    const constraintsCheck =
      await this.postsRepository.publicationsConstraintCheck(id);
    if (constraintsCheck.length > 0) {
      throw new HttpException('Forbidden', 403);
    }
    await this.postsRepository.deletePost(id);
  }
}
