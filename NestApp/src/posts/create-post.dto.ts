export class CreatePostDto {
    readonly title: string;
    readonly body: Text;
    readonly postedAt: Date;
    readonly userId: number;
}