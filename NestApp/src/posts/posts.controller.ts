import { Body, Put, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAll();
  }
  
  @Get(':postId') // http://localhost:port/posts/56
  getPost(@Param('postId') postId): any {
    const post = this.postsService.getPostById(postId);
    if (!post) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return post;
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.addPost(createPostDto);
  }

  @Put(':postId')
  updatePost(@Param('postId') postId:number,@Body() createPostDto: CreatePostDto): any {
    return this.postsService.updatePost(postId,createPostDto);
  }

  @Delete(':postId')
  removePost(postId): any {
    console.log("Deleting server");
    
    return this.postsService.removePost(postId);
  }
}
