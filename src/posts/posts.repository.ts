import { Injectable } from '@nestjs/common';
import { Posts } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  // POST /posts
  async postPost(createPostDto: CreatePostDto): Promise<Posts> {
    const result = await this.prisma.posts.create({
      data: createPostDto,
    });
    return result;
  }

  // GET /posts
  async getAllPosts(): Promise<Posts[]> {
    const result = await this.prisma.posts.findMany();
    return result;
  }

  // GET /posts/:id
  async getPostById(id: number): Promise<Posts> {
    const result = await this.prisma.posts.findUnique({
      where: { id },
    });
    return result;
  }

  // PUT /posts/:id
  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Posts> {
    const result = await this.prisma.posts.update({
      where: { id },
      data: updatePostDto,
    });
    return result;
  }

  // DELETE /posts/:id
  async publicationsConstraintCheck(id: number) {
    const result = await this.prisma.publications.findMany({
      where: { postId: id },
    });
    return result;
  }

  async deletePost(id: number) {
    const result = await this.prisma.posts.delete({
      where: { id },
    });
    return result;
  }
}
