export class Publication {
  mediaId: number;
  postId: number;
  date: string;
  constructor(mediaId: number, postId: number, date: string) {
    this.mediaId = mediaId;
    this.postId = postId;
    this.date = date;
  }
}
