export default class Comment {
  constructor(data) {
    this.id = data[`id`];
    this.emotion = data[`emotion`];
    this.author = data[`author`];
    this.comment = data[`comment`];
    this.date = data[`date`];
  }

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(comments) {
    return comments.map((comment) => Comment.parseComment(comment));
    // return data.map(Comment.parseComment);
  }
}
