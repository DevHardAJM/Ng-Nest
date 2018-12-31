import { Injectable } from '@nestjs/common';
import * as faker from 'faker/locale/fr';
import { UsersService } from '../users/users.service';
import { CreatePostDto } from './create-post.dto';

@Injectable()
export class PostsService {
  private readonly posts: any[];
  constructor(private usersService: UsersService) {
    this.posts = new Array(200)
      .fill(1)
      .map((e,i) => {
        return {
          id: i + 1,
          title: faker.lorem.sentence(),
          body: faker.lorem.paragraphs(3),
          postedAt: faker.date.past(),
          userId: this.getUserId(),
        };
      }).sort((e1, e2) => {
        if (e1.postedAt > e2.postedAt) {
          return 1;
        } else if (e1.postedAt === e2.postedAt) {
          return 0;
        } else { return -1}
    });
  }

  getAll() {
    return this.posts;
  }

  getPostById(postId: number) {
    return this.posts.find(e => e.id === Number(postId));
  }
  
  removePost(postId) {
    const postIndex = this.posts.findIndex(e => e.id === postId);
    this.posts.splice(postIndex, 1);
    return postIndex;
  }
  
  addPost(createPostDto: CreatePostDto) {
    const Post = {
      id: this.generateId(),
      title: createPostDto.title,
      body: createPostDto.body,
      postedAt: createPostDto.postedAt,
      userId: createPostDto.userId
    };
    this.posts.push(Post);
    return Post;
  }

  updatePost(postId: number,createPostDto: CreatePostDto) {

    const postIndex = this.posts.findIndex(e => e.id === postId);
    if (postIndex) {
      this.posts[postIndex].title=createPostDto.title;
      this.posts[postIndex].body=createPostDto.body;
      this.posts[postIndex].postedAt=createPostDto.postedAt;
      this.posts[postIndex].userId=createPostDto.userId;
    }
    
    return this.posts[postIndex];
  }
  
  private getUserId() {
     const users = this.usersService.getAll();
     const index = Math.floor(Math.random() * users.length);
     return users[index].id;
  }

  private generateId() {
    return this.posts.length > 0 ?
      Math.max(...this.posts.map(e => e.id)) + 1 :
      1;
  }

}
